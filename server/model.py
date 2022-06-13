import sys, fitz

def open_file(filename):
    docs=fitz.open(filename)
    txt=''
    for page in docs:
        txt=txt+str(page.get_text())
    tx=' '.join(txt.split('\n'))
    return tx