export default class Pinger {
  token = null;

  ping(url, tries, timeout, callback) {
    let count = 0;
    this.token = setInterval(async () => {
      if (count < tries) {
        const response = await fetch(url);
        if (response.ok) {
          clearInterval(this.token);
          callback(true);
        }
      } else {
        clearInterval(this.token);
        callback(false);
      }

      tries++;
    }, timeout);
  }
}
