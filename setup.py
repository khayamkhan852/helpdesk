from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in frappedesk/__init__.py
from helpdesk import __version__ as version

setup(
	name="helpdesk",
	version=version,
	description="custom updated in the official Frappe Helpdesk application",
	author="khayam khan",
	author_email="khayamkhan852@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires,
)
