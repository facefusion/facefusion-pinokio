const path = require('path');

module.exports = () =>
{
	const config =
	{
		daemon: true,
		cmd:
		{
			'Default': 'python facefusion.py run',
			'Default+Jobs': 'python facefusion.py run --ui-layouts default jobs',
			'Benchmark': 'python facefusion.py run --ui-layouts benchmark',
			'Webcam': 'python facefusion.py run --ui-layouts webcam'
		},
		run:
		[
			{
				method: 'local.set',
				params:
				{
					mode: '{{ input.mode }}'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: '{{ self.cmd[local.mode] }}',
					path: 'facefusion',
					conda:
					{
						path: path.resolve(__dirname, '.env')
					},
					on:
					[
						{
							event: '/(http:\/\/[0-9.:]+)/',
							done: true
						}
					]
				}
			},
			{
				method: 'local.set',
				params:
				{
					url: '{{ input.stdout.match(/(http:\\S+)/gi)[0] }}'
				}
			},
			{
				method: 'browser.open',
				params:
				{
					uri: '{{ local.url }}',
					target: '_blank'
				}
			},
			{
				method: 'proxy.start',
				params:
				{
					uri: '{{ local.url }}',
					name: 'Share Local'
				}
			}
		]
	};

	return config;
};
