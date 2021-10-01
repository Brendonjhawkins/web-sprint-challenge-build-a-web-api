const User = require('./projects-model')


async function validateProjectId(req, res, next) { 
  try {
      const { id } = req.params
      const project = await User.get(id)
      if (project) {
          req.project = project
          next()
      } else {
          next({
              status: 404,
              message: 'project not found'
          })
      }
  } catch (err) {
      next(err)
  }
}

async function validateProject(req, res, next) {
  const { name, description, completed } = req.body
  if (!name || !name.trim() || !description || !description.trim()) {
    next({
        status: 400,
        message: 'missing required name field'
    })
  }
  else {
      req.name = name.trim()
      req.description = description.trim()
      req.completed = completed
      next()
  }
}

 
module.exports = {
validateProject,
validateProjectId
}