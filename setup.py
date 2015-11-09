from distutils.core import setup
from setuptools import find_packages

setup(
    name='sandbox',
    version='0.1',
    install_requires=[
        'Django',
        'django-leaflet',
        'django-geojson',
    ],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
