const path = require('path');

module.exports = () =>
{
	const config =
	{
		run:
		[
			{
				method: 'fs.rm',
				params:
				{
					'path': 'facefusion'
				}
			},
{
				method: 'fs.rm',
				params:
				{
					path: path.resolve(__dirname, '.env')
				}
			}
		]
	};

	return config;
};

