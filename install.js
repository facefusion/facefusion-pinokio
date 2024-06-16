function install(kernel)
{
	const { platform, gpu } = kernel;

	if (platform === 'darwin')
	{
		return 'python install.py --onnxruntime default';
	}
	if ([ 'linux', 'win32' ].includes(platform) && gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda-11.8';
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
					message: 'git clone https://github.com/facefusion/facefusion --branch 2.6.1 --single-branch'
				}
			},
			{
				when: '{{ gpu === "nvidia" }}',
				method: 'shell.run',
				params:
				{
					message: 'conda install cudatoolkit=11.8 cudnn=8.9.2.26 conda-forge::gputil=1.4.0 --yes',
					conda:
					{
						name: 'facefusion'
					}
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
