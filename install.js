function install(kernel)
{
	const { platform, gpu } = kernel;

	if (platform === 'darwin')
	{
		return 'python install.py --onnxruntime default --torch default --skip-venv';
	}
	if ([ 'linux', 'win32' ].includes(platform) && gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda --torch cuda --skip-venv';
	}
	if (gpu === 'amd')
	{
		if (platform === 'linux')
		{
			return 'python install.py --onnxruntime rocm --torch rocm --skip-venv';
		}
		if (platform === 'win32')
		{
			return 'python install.py --onnxruntime directml --torch cpu --skip-venv';
		}
	}
	return 'python install.py --onnxruntime default --torch cpu --skip-venv';
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
					'ffmpeg'
				],
				args: '-c conda-forge'
			}
		],
		run:
		[
			{
				method: 'shell.run',
				params:
				{
					message: 'git clone https://github.com/facefusion/facefusion --branch next --single-branch'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					env:
					{
						PYTHONNOUSERSITE: 'True'
					},
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
