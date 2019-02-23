const generateUi = require('./prompt')
const Branding = require('../../commons/branding')
const YasgeGenerator = require('../../commons/yasge-generator')

module.exports = class LibraryGenerator extends YasgeGenerator {
  
  initializing() {
    this.composed = this.options.composed === undefined ? null : this.options.composed

    if (!this.composed) {
      this.log(Branding.logo())
      this.log(Branding.title("Library project generation"))
    }    
  }

  prompting() {
    if (this.config.get('projectType') === 'library') {
      this.libraryProjectType = true
      return this.prompt(generateUi())
        .then(answers => this.answers = answers)
    }
  }

  configuring() {
    if (this.libraryProjectType) {
      const projectManagerFeatures = this.config.get("projectManagerFeatures")
          .push('java-library')
      this.config.set("projectManagerFeatures", projectManagerFeatures)

      this.config.set("publishRepository", this.answers.publishRepository)
      if (this.answers.publishRepository) {
        this.config.set("publishRepositoryReleasesUrl", this.answers.publishRepositoryReleasesUrl)
        this.config.set("publishRepositorySnapshotsUrl", this.answers.publishRepositorySnapshotsUrl)
        this.config.set("publishRepositoryAuth", this.answers.publishRepositoryAuth)

        if (this.answers.publishRepositoryAuth) {
          this.config.set("publishRepositoryUser", this.answers.publishRepositoryUser)
          this.config.set("publishRepositoryPassword", this.answers.publishRepositoryPassword)
        }
      }
    }
  }
}