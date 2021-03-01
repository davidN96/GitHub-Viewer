<template>
  <div class="errorModalWrapper">
    <div class="errorModal">
      <header>
        <div class="errorModalIcon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <h3>{{ title }}</h3>
      </header>
      <main>
        <h4>{{ message }}</h4>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ErrorModal extends Vue {
  private visible: boolean = true;
  @Prop({ default: 'Error' }) private title!: string;
  @Prop({ default: 'Sorry, error ocurred' }) private message!: string;
  @Prop(String) private redirectTo: string | undefined;
}
</script>

<style lang="scss" scoped>
.errorModalWrapper {
  display: flex;
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  transition: visibility 0.2s;
  cursor: pointer;

  .errorModal {
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $darkGray;
    width: 80vw;
    min-height: 45vh;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    transition: visibility 0.2s;
    padding: 5vh 2vw;
    text-align: center;

    @include sm() {
      width: 30vw;
    }

    header {
      .errorModalIcon {
        font-size: 2.3rem;
        color: $red;
      }

      h3 {
        margin-top: 1vh;
      }
    }

    main {
      margin-top: 1vh;
    }
  }
}
</style>
