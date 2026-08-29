# -*- coding: utf-8 -*- #
import argparse
import json
from sys import exit

def load(file: str) -> dict:
    with open(file) as f:
        return json.load(f)


def check(data: dict) -> bool:
    result = True
    title_list = []
    link_list = []
    for d in data:
        title = d["title"]
        title_list.append(title)

        if title not in d["names"]:
            print(f'{title}の names に「{title}」が含まれていません')
            result = False

        editor_names = []
        editor_links = []
        link_set = set()
        for l in d["editors"]:
            editor_names.append(l["name"])
            editor_links.append(l["link"])
            link_set.add(l["link"])
        link_list += list(link_set)

        editor_name_check = check_doubled(editor_names)
        if len(editor_name_check) > 0:
            for name in editor_name_check:
                print(f'{title}の editors に「{name}」が複数あります')
                result = False

        editor_link_check = check_doubled(editor_links)
        if len(editor_link_check) > 0:
            for link in editor_link_check:
                print(f'{title}の editors に"{link}"が複数あります')
                result = False

    title_check = check_doubled(title_list)
    if len(title_check) > 0:
        for title in title_check:
            print(f'タイトル「{title}」が複数あります')
        result = False

    link_check = check_doubled(link_list)
    if len(link_check) > 0:
        for link in link_check:
            print(f'"{link}"が複数のパズルに登場します')
        result = False

    return result


def check_doubled(targets: list) -> set:
    result = set()
    for target in targets:
        if targets.count(target) > 1:
            result.add(target)
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--json_file', type=str, default="data/dict.json")
    args = parser.parse_args()

    data = load(args.json_file)
    if check(data):
        print("OK")
    else:
        print("NG!!")
        exit(1)


if __name__ == '__main__':
    main()