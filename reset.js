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
			}
		]
	};

	return config;
};

