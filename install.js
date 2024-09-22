function install(kernel)
{
	const { platform, gpu } = kernel;

	if (gpu === 'amd')
	{
		if (platform === 'linux')
		{
			return 'python install.py --onnxruntime rocm';
		}
		if (platform === 'win32')
		{
			return 'python install.py --onnxruntime directml';
		}
	}
	if (gpu === 'intel')
	{
		return 'python install.py --onnxruntime openvino';
	}
	if (gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda';
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
					message: 'git clone https://github.com/facefusion/facefusion --branch 3.0.0 --single-branch'
				}
			},
			{
				when: '{{ gpu === "intel" }}',
				method: 'shell.run',
				params:
				{
					message: 'conda install conda-forge::openvino=2024.3.0 --yes',
					conda:
					{
						path: 'facefusion/.env'
					}
				}
			},
			{
				when: '{{ gpu === "nvidia" }}',
				method: 'shell.run',
				params:
				{
					message: 'conda install conda-forge::cuda-runtime=12.4.1 cudnn=9.2.1.18 --yes',
					conda:
					{
						path: 'facefusion/.env'
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
						path: 'facefusion/.env'
					}
				}
			},
			{
				method: 'input',
				params:
				{
					title: 'Installation completed',
					description: 'Return to the dashboard to start FaceFusion.'
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
