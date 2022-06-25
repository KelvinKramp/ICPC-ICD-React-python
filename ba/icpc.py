import pandas as pd
import numpy as np
from tabula import read_pdf
import json
import os
from definitions import ROOT_DIR
from pprint import pprint


data = read_pdf('https://referentiemodel.nhg.org/sites/default/files/NHG-Tabel%2024-ICPC-versie-10-Inkijkexemplaar_0.pdf', pages='all')
df = pd.concat(data)
ICPC_json = df.to_json(orient="records")
# pprint(ICPC_json)
json_file_name = os.path.join(ROOT_DIR, "ICPC.json")
out_file = open(json_file_name, "w")  
json.dump(ICPC_json, out_file)
out_file.close()
