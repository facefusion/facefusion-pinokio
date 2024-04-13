function install(kernel)
{
	const { platform, gpu } = kernel;

	if (platform === 'darwin')
	{
		return 'python install.py --onnxruntime default';
	}
	if ([ 'linux', 'win32' ].includes(platform) && gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda-12.2';
	}
	if (gpu === 'amd')
	{
		if (platform === 'linux')
		{
			return 'python install.py --onnxruntime rocm-5.4.2';
		}
		if (platform === 'win32')
		{
			return 'python install.py --onnxruntime directml';
		}
	}
	return 'python install.py --onnxruntime default';
}

module.exports = async kernel =>
{
	const config =
	{
		run:
		[
			{
				method: 'shell.run',
				params:
				{
					message: 'git clone https://github.com/facefusion/facefusion --branch 2.5.1 --single-branch'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: install(kernel),
					path: 'facefusion',
					env:
					{
						PYTHONNOUSERSITE: 'True'
					},
					conda:
					{
						name: 'facefusion'
					}
				}
			},
			{
				method: 'input',
				params:
				{
					title: 'Install complete',
					description: 'Go back to the dashboard to launch the application.'
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
