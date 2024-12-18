const path = require('path');

function install(kernel)
{
	const { platform, gpu } = kernel;

	if (platform === 'linux' && gpu === 'amd')
	{
		return 'python install.py --onnxruntime rocm';
	}
	if (platform === 'win32' && gpu === 'amd')
	{
		return 'python install.py --onnxruntime directml';
	}
	if ((platform === 'linux' || platform === 'win32') && gpu === 'intel')
	{
		return 'python install.py --onnxruntime openvino';
	}
	if ((platform === 'linux' || platform === 'win32') && gpu === 'nvidia')
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
					message: 'git clone https://github.com/facefusion/facefusion --branch 3.0.1 --single-branch'
				}
			},
			{
				when: '{{ (platform === "linux" || platform === "win32") && gpu === "intel" }}',
				method: 'shell.run',
				params:
				{
					message: 'conda install conda-forge::openvino=2024.3.0 --yes',
					conda:
					{
						path: path.resolve(__dirname, '.env')
					}
				}
			},
			{
				when: '{{ (platform === "linux" || platform === "win32") && gpu === "nvidia" }}',
				method: 'shell.run',
				params:
				{
					message:
					[
						'conda install conda-forge::cuda-runtime=12.4.1 cudnn=9.2.1.18 --yes',
						'pip install tensorrt==10.5.0 --extra-index-url https://pypi.nvidia.com'
					],
					conda:
					{
						path: path.resolve(__dirname, '.env')
					}
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: install(kernel),
					path: 'facefusion',
					conda:
					{
						path: path.resolve(__dirname, '.env')
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
