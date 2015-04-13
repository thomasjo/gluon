_ = require 'lodash'

module.exports =
  activate: ->
    @commands = atom.commands.add 'atom-workspace',
      'gluon:build': => @build()

  deactivate: ->
    @commands.dispose()

  build: ->
    builder.buildFunction() if builder = @builderForActiveTextEditor()

  provideBuildService: ->
    register: (registration) =>
      return unless registration?

      @builders ?= {}
      @builders[registration.name] = registration

  builderForActiveTextEditor: ->
    activeGrammar = @getActiveGrammar()
    return unless activeGrammar?

    isMappedToActiveGrammer = (builder) -> _.includes(builder.grammars, activeGrammar)
    builder = _.find(@builders, isMappedToActiveGrammer)

  getActiveGrammar: ->
    editor.getGrammar().scopeName if editor = @getActiveTextEditor()

  getActiveTextEditor: ->
    atom.workspace.getActiveTextEditor()
