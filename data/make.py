# -*- coding: utf-8 -*- #
import argparse
import json
import sys
from bs4 import BeautifulSoup


def load(file: str) -> str:
    with open(file) as f:
        return f.read()


class Puzzle:
    def __init__(self) -> None:
        self.title = ""
        self.names = set()
        self.editors = []
    
    def set_editor(self, name: str, link: str) -> None:
        for editor in self.editors:
            if editor["link"] == link:
                return
        editor_dict = {"name": name, "link": link}
        self.editors.append(editor_dict)

    def add(self, title: str, editor: str, link: str) -> None:
        self.title = title
        self.names.add(title)
        self.set_editor(editor, link)

    def get_dict(self) -> dict:
        editors_list = []
        for editor in self.editors:
            editors_list.append({"name": editor["name"], "link": editor["link"]})
        puzzle_dict = {"title": self.title, "names": list(self.names), "editors": editors_list}
        return puzzle_dict


class PDict:
    def __init__(self) -> None:
        self.puzzles = []
        self.titles = set()
        self.links = set()
    
    def set_puzzle(self, name: str, editor: str, link: str) -> None:
        if name in self.titles:
            self.add_editor(name, editor, link)
            self.links.add(link)
            return
        if link in self.links:
            self.add_name(name, link)
            return
        self.titles.add(name)
        self.links.add(link)
        puzzle = Puzzle()
        puzzle.add(name, editor, link)
        self.puzzles.append(puzzle)

    def add_editor(self, title: str, editor: str, link: str) -> None:
        for index, puz in enumerate(self.puzzles):
            if puz.title == title:
                self.puzzles[index].set_editor(editor, link)
                return

    def add_name(self, name: str, link: str) -> None:
        for index, puz in enumerate(self.puzzles):
            for editor in puz.editors:
                if editor["link"] == link:
                    self.puzzles[index].names.add(name)
                    return

    def load(self, editor: str, data: str) -> None:
        soup = BeautifulSoup(data, 'html.parser')
        a_list = soup.body.find('div', id='table_all').find_all('a')
        for a_tag in a_list:
            # ヘルプページへのリンクは無視
            if a_tag.string == '?':
                continue
            self.set_puzzle(a_tag.string, editor, a_tag.get('href'))

    def get(self) -> list:
        puzzle_list = []
        for puzzle in self.puzzles:
            puzzle_list.append(puzzle.get_dict())
        return puzzle_list


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--pzprv3', type=str)
    parser.add_argument('--puzzlink-ja', type=str)
    parser.add_argument('--puzzlink-en', type=str)
    args = parser.parse_args()

    puzzle_dict = PDict()
    if args.pzprv3:
        data = load(args.pzprv3)
        puzzle_dict.load("ぱずぷれv3", data)

    if args.puzzlink_ja:
        data = load(args.puzzlink_ja)
        puzzle_dict.load("puzz.link", data)
    
    if args.puzzlink_en:
        data = load(args.puzzlink_en)
        puzzle_dict.load("puzz.link", data)

    print(json.dumps(puzzle_dict.get()))


if __name__ == '__main__':
    main()
