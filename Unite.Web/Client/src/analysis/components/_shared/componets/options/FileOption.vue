<template>
  <!-- Readonly -->
  <div v-if="readonly" class="row items-center q-gutter-xs">
    <div class="text-grey">{{ option.title }}: </div>
    <div>{{ option.value}}</div>
  </div>
  <!-- Editable -->
  <q-file
    v-else
    v-model="option.value"
    :label="option.title"
    :accept="option.accept"
    :max-file-size="option.size"
    clearable
    dense square outlined>
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script>
import { FileOption } from "../../options.ts";

export default {
  props: {
    option: {
      type: FileOption,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>