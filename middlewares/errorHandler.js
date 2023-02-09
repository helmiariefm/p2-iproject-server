const  errorHandler = (err, req, res, next) => {
	console.error(err, '<<<==== YOUR ERROR!');
	let  msg = `Internal server error`
	let  status = 500

	switch (err.name) {
		case  "SequelizeValidationError":
			msg =  err.errors.map(el  => {
				return {message:  el.message}
			})
			status = 400
		break
		case  "SequelizeUniqueConstraintError":
			msg =  err.errors.map(el  => {
				return {message:  el.message}
			})
			status = 400
		break
		case "MidtransError":
			msg = err.ApiResponse.error_messages[0]
			status = 400
		break
	}

	res.status(status).json({message: msg})
}

module.exports = errorHandler