module.exports =
  activate: ->
    return

  # deactivate: ->

  provideBuildService: ->
    register: (name, details) ->
      console.log(name)
