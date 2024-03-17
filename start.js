module.exports = () =>
{
	const config =
	{
		daemon: true,
		cmd:
		{
			Default: 'python run.py',
			Benchmark: 'python run.py --ui-layouts benchmark',
			Webcam: 'python run.py --ui-layouts webcam'
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
					venv: 'env',
					conda:
					{
						name: '{{ gpu === "nvidia" ? "cu118" : "base" }}'
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
			}
		]
	};

	return config;
};
