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
					'path': '.env'
				}
			}
		]
	};

	return config;
};

