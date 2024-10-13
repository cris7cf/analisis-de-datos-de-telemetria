from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Leer el CSV y preservar el orden de las carreras según su aparición en el archivo
df = pd.read_csv('Formula1_2023season_raceResults.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Crear una estructura de diccionario manteniendo el orden de las pistas
    pilotos_data = df[['Track', 'Driver', 'Points']]

    # Agrupar los datos pero sin alterar el orden de las pistas
    pilotos_dict = {}
    for piloto in pilotos_data['Driver'].unique():
        resultados = pilotos_data[pilotos_data['Driver'] == piloto]
        pilotos_dict[piloto] = {
            'track': resultados['Track'].tolist(),
            'points': resultados['Points'].tolist()
        }

    return jsonify(pilotos_dict)

if __name__ == '__main__':
    app.run(debug=True)


