  <template>
    <div>
      <q-btn color="red" dense flat no-caps style: icon="svguse:/icons.svg#circle-xmark-regular" label="Reject" @click="openDialog" />
      <q-dialog v-model="isDialogOpen">
        <q-card>
          <q-card-section style="width: 400px;">
            <div>Are you sure you want to reject {{ value }}?</div>
          </q-card-section>

          <q-card-section class="q-gutter-y-sm">
            <div>
              <q-input 
              v-model="inputText" 
              label="Enter comment" 
              />
            </div>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn label="Cancel" color="primary" dense flat no-caps @click="closeDialog" />
            <q-btn label="Confirm" color="red" dense flat no-caps @click="confirmReject" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import api from "../../api/api-submissions";
  export default {
    props: {
      value: {
        type: [Number],
        required: true,
      },
    },
    data() {
      return {
        isDialogOpen: false,
        rejectStatus: false,
      };
    },
    methods: {
      openDialog() {
        this.isDialogOpen = true;
      },
      closeDialog() {
        this.isDialogOpen = false;
      },
      async confirmReject() {
        this.rejectStatus = await api.updateRejectComment(this.value, this.inputText);
       
        this.$emit('reject', this.rejectStatus);
        this.closeDialog();
      }
  }
}
  </script>