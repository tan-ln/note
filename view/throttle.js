function throttle(func, wait) {
	let timer, context, args

	return function () {
		context = this
		args = arguments
		if (!timer) {
			timer = setTimeout(() => {
				// 在 timer 内，只执行最后一次，下一个timer 再执行
				// 每隔一段 timer 执行一次
				func.apply(context, args)
				clearTimeout(timer)
				timer = null
			}, wait)

			console.log('throttle')
		}
	}
}