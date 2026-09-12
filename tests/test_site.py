import re
import json
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent

def read(name):
    return (ROOT / name).read_text(encoding="utf-8")

def test_index_has_required_structure():
    soup = BeautifulSoup(read("index.html"), "html.parser")
    assert soup.title is not None and soup.title.text.strip() != ""
    assert soup.find(id="featured-books") is not None, "featured-books container missing"
    assert soup.find("script", src="script.js") is not None, "index.html must load script.js"

def test_login_and_register_pages_have_forms():
    for page in ("login.html", "register.html"):
        soup = BeautifulSoup(read(page), "html.parser")
        assert soup.find("form") is not None, f"{page} has no <form>"

def test_dummy_books_are_well_formed():
    js = read("script.js")
    match = re.search(r"const dummyBooks\s*=\s*(\[.*?\]);", js, re.S)
    assert match, "dummyBooks array not found in script.js"
    # crude JS->JSON cleanup for a simple literal array
    raw = re.sub(r"(\w+):", r'"\1":', match.group(1))
    raw = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', match.group(1))
    books = json.loads(raw)
    assert len(books) > 0
    for book in books:
        assert book.get("title"), "a book is missing a title"
        assert book.get("author"), "a book is missing an author"