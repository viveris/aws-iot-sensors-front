import os
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape


def create_missing_directories(template_path):
    directory = Path(template_path).parent

    if not os.path.exists(directory):
        os.makedirs(directory)


if __name__ == '__main__':
    env = Environment(
        loader=FileSystemLoader("src"),
        autoescape=select_autoescape(),
    )

    src_dir = 'src'
    target_templates = [
        'index.html',
        'script.js',
    ]

    dest_dir = 'dist'

    for base_path in target_templates:
        dest_path = Path(dest_dir, base_path)

        create_missing_directories(dest_path)

        template = env.get_template(base_path)
        template.stream().dump(str(dest_path))
