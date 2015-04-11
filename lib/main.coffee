module.exports =
  activate: ->
    @commands = atom.commands.add 'atom-workspace',
      'gluon:build': =>
        fn() if fn = @builders[Object.keys(@builders)?[0]]

  deactivate: ->
    @commands.dispose()

  provideBuildService: ->
    register: (name, details) =>
      @builders ?= {}
      @builders[name] = details
