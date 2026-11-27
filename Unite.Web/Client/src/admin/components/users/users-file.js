import { isEmail } from "@/_shared/helpers/string-helpers";

// Users file format, shared by import, export and the templates in public/templates/identity:
// - TSV (tab) or CSV (comma), chosen by the file extension;
// - empty lines are skipped, the first line is the header: 'email' (required), 'provider', 'permissions' in any order;
// - 'provider' is a provider name or label, empty means the first active provider;
// - 'permissions' are separated by ';' or ',', 'Data.Read' is always granted.

const delimiters = { tsv: "\t", csv: "," };
const mimeTypes = { tsv: "text/tab-separated-values", csv: "text/csv" };
const columns = ["email", "provider", "permissions"];
const permissions = ["Data.Read", "Data.Write"];
const defaultPermission = "Data.Read";
const permissionsSeparator = ";";
const emailMaxLength = 100;


export function getFormat(fileName) {
  const extension = fileName?.split(".").pop().toLowerCase();
  return delimiters[extension] ? extension : null;
}

export function getMimeType(format) {
  return mimeTypes[format];
}

/**
 * Reads users from file content.
 * @param {string} content File content
 * @param {string} format 'tsv' or 'csv'
 * @param {Array} providers Active identity providers ({ id, name, label }), the first one is the default
 * @returns { users } with one entry per data line ({ line, email, provider, providerId, permissions, error }), or { error }
 */
export function readUsers(content, format, providers) {
  const delimiter = delimiters[format];

  const lines = content.replace(/^﻿/, "").split(/\r?\n/)
    .map((text, index) => ({ number: index + 1, cells: readCells(text, delimiter) }))
    .filter(line => !isEmptyLine(line.cells));

  if (!lines.length)
    return { error: "The file has no header row" };

  const header = lines[0].cells.map(cell => cell.toLowerCase());
  const indices = Object.fromEntries(columns.map(column => [column, header.indexOf(column)]));

  if (indices.email < 0)
    return { error: "The header row has no 'email' column" };

  const users = [];
  const userLines = new Map();

  for (const line of lines.slice(1)) {
    const user = readUser(line, indices, providers);

    if (!user.error) {
      const key = `${user.providerId}:${user.email}`;
      const firstLine = userLines.get(key);
      if (firstLine)
        user.error = `Duplicate of line ${firstLine}`;
      else
        userLines.set(key, user.line);
    }

    users.push(user);
  }

  return { users };
}

/**
 * Writes users ({ email, provider, permissions }) to file content in the import format.
 * Provider labels are written as provider names where the provider is known.
 */
export function writeUsers(users, format, providers) {
  const delimiter = delimiters[format];

  const lines = users.map(user => {
    const provider = providers?.find(provider => provider.label == user.provider);
    return [user.email, provider?.name ?? user.provider, user.permissions?.join(permissionsSeparator)];
  });

  return [columns, ...lines]
    .map(cells => cells.map(cell => writeCell(cell, delimiter)).join(delimiter))
    .join("\n") + "\n";
}

function readUser(line, indices, providers) {
  const email = getCell(line.cells, indices.email).toLowerCase();
  const providerName = getCell(line.cells, indices.provider).toLowerCase();
  const permissionNames = getCell(line.cells, indices.permissions)
    .split(/[;,]/)
    .map(name => name.trim())
    .filter(name => name.length);

  const provider = providerName
    ? providers.find(provider => provider.name.toLowerCase() == providerName || provider.label?.toLowerCase() == providerName)
    : providers[0];

  const unknownPermission = permissionNames.find(name => !findPermission(name));

  const userPermissions = [defaultPermission, ...permissionNames.map(findPermission)]
    .filter((permission, index, all) => permission && all.indexOf(permission) == index);

  const user = {
    line: line.number,
    email: email,
    provider: provider?.label ?? providerName,
    providerId: provider?.id,
    permissions: userPermissions,
    error: null
  };

  if (!isEmail(email))
    user.error = "Invalid email";
  else if (email.length > emailMaxLength)
    user.error = `Email is longer than ${emailMaxLength} characters`;
  else if (!provider)
    user.error = `Unknown provider '${providerName}'`;
  else if (unknownPermission)
    user.error = `Unknown permission '${unknownPermission}'`;

  return user;
}

function findPermission(name) {
  return permissions.find(permission => permission.toLowerCase() == name.toLowerCase());
}

function getCell(cells, index) {
  return index < 0 ? "" : cells[index] ?? "";
}

function isEmptyLine(cells) {
  return cells.every(cell => !cell.length);
}

// Reads one line, supporting double-quoted cells with "" as an escaped quote.
function readCells(text, delimiter) {
  const cells = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char == '"' && text[i + 1] == '"') {
        cell += char;
        i++;
      } else if (char == '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char == '"' && !cell.trim().length) {
      cell = "";
      quoted = true;
    } else if (char == delimiter) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell.trim());

  return cells;
}

function writeCell(value, delimiter) {
  const text = value ?? "";

  if (text.includes(delimiter) || text.includes('"'))
    return `"${text.replaceAll('"', '""')}"`;

  return text;
}
