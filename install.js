function install(kernel)
{
	const { platform, arch, gpu } = kernel;

	if (platform === 'darwin')
	{
		if (arch === 'arm64')
		{
			return 'python install.py --onnxruntime coreml-silicon --torch default';
		}
		return 'python install.py --onnxruntime default --torch default';
	}
	if (gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda --torch cuda';
	}
	if (gpu === 'amd')
	{
		return 'python install.py --onnxruntime default --torch cpu';
	}
	return 'python install.py --onnxruntime default --torch cpu';
}

module.exports = async kernel =>
{
	const config =
	{
		requires:
		[
			{
				type: 'conda',
				name:
				[
					'cmake',
					'ffmpeg'
				],
				args: '-c conda-forge'
			},
			{
				gpu: 'nvidia',
				name: 'cuda'
			}
		],
		run:
		[
			{
				method: 'shell.run',
				params:
				{
					message: 'git clone https://github.com/facefusion/facefusion --branch 2.0.0 --single-branch'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: install(kernel),
					path: 'facefusion',
					venv: 'env'
				}
			},
			{
				method: 'input',
				params:
				{
					title: 'Install complete',
					description: 'Go back to the dashboard and launch the application.'
				}
			},
			{
				method: 'browser.open',
				params:
				{
					uri: '/?selected=facefusion'
				}
			}
		]
	};

	return config;
};
