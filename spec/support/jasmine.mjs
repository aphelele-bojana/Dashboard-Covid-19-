export default {
  spec_dir: ".",
  spec_files: [
    "tests/**/*[sS]pec.?(m)js"
  ],
  helpers: [
    "spec/helpers/**/*.mjs"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
    forbidDuplicateNames: true
  }
};
