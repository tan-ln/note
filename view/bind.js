// bind
Function.prototype._bind = function (ctx) {
	const self = this
	const _args = Array.prototype.slice.call(arguments, 1)
	// console.log('_args: ' + _args)		// 2, 3

	return function () {
		// console.log('arguments: ' + [...arguments])		// 4
		const newArgs = _args.concat([...arguments])			// 2, 3, 4
		self.apply(ctx, newArgs)
	}
}

const obj = {
	a: 1
}

const show = function (i, j) {
	console.log('show')
}

show._bind(obj, 2, 3)(4)
