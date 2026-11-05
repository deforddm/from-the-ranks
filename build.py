#!/usr/bin/env python3
"""Concatenate src/ into index.html. Order: 000_head.html, 001_style.css, 002_body.html, 003-998_*.js (sorted), 999_boot2.js."""
import glob, os, re
root = os.path.dirname(os.path.abspath(__file__)); src = os.path.join(root, 'src')
rd = lambda n: open(os.path.join(src, n), encoding='utf-8').read()
js = [os.path.basename(p) for p in sorted(glob.glob(os.path.join(src, '*.js'))) if not os.path.basename(p).startswith('999_')]
out = rd('000_head.html') + '<style>\n' + rd('001_style.css') + '</style>\n<style>[hidden]{display:none!important}body{margin:0}</style>\n</head><body>\n\n' + rd('002_body.html') + '<script>\n' + ''.join('\n' + rd(n) for n in js).lstrip('\n') + '</script>\n\n<script>\n' + rd('999_boot2.js') + '</script>\n</body></html>\n'
open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html', len(out), 'bytes from', len(js) + 4, 'files')
