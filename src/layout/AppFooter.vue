<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a target="_blank" rel="noopener">이대희</a>
            &
            <a target="_blank" rel="noopener">박자연</a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com"
                class="nav-link"
                target="_blank"
                rel="noopener"
                >SSAFY</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" rel="noopener">구미 5반</a>
            </li>
            <li class="nav-item">
              <a
                href="https://lab.ssafy.com/kofgb1234/happyhouse_vue_-_05-_-_.git"
                class="nav-link"
                target="_blank"
                rel="noopener"
                >Git</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                class="nav-link"
                target="_blank"
                rel="noopener"
                >MIT License</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
