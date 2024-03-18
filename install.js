function install(kernel)
{
	const { platform, gpu } = kernel;

	if (platform === 'darwin')
	{
		return 'python install.py --onnxruntime default --skip-venv';
	}
	if ([ 'linux', 'win32' ].includes(platform) && gpu === 'nvidia')
	{
		return 'python install.py --onnxruntime cuda-11.8 --skip-venv';
	}
	if (gpu === 'amd')
	{
		if (platform === 'linux')
		{
			return 'python install.py --onnxruntime rocm-5.4.2 --skip-venv';
		}
		if (platform === 'win32')
		{
			return 'python install.py --onnxruntime directml --skip-venv';
		}
	}
	return 'python install.py --onnxruntime default --skip-venv';
}

module.exports = async kernel =>
{
	const config =
	{
		run:
		[
			{
				when: '{{ gpu === "nvidia" }}',
				method: 'shell.run',
				params:
				{
					message:
					[
						'conda install -y --override-channels cudatoolkit=11.8.0 cudnn=8.4.1.50 -c conda-forge'
					],
					conda:
					{
						name: '{{ gpu === "nvidia" ? "cu118" : "base" }}'
					}
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git clone https://github.com/facefusion/facefusion --branch 2.4.0 --single-branch'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: install(kernel),
					path: 'facefusion',
					venv: 'env',
					env:
					{
						PYTHONNOUSERSITE: 'True'
					},
					conda:
					{
						name: '{{ gpu === "nvidia" ? "cu118" : "base" }}'
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
