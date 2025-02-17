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
					message: 'git clone https://github.com/facefusion/facefusion --branch 3.2.0 --single-branch'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'conda install conda-forge::ffmpeg=7.1.1 conda-forge::libvorbis=1.3.7 --yes',
					conda:
					{
						path: path.resolve(__dirname, '.env')
					}
				}
			},
			{
				when: '{{ (platform === "linux" || platform === "win32") && gpu === "intel" }}',
				method: 'shell.run',
				params:
				{
					message: 'conda install conda-forge::openvino=2025.0.0 --yes',
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
						'conda install conda-forge::cuda-runtime=12.8.0 conda-forge::cudnn=9.7.1.26 --yes',
						'pip install tensorrt==10.8.0.43 --extra-index-url https://pypi.nvidia.com'
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
