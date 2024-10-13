async function cargarDatos() {
            const response = await fetch('/data');
            const data = await response.json();

            // Llenar los selectores de pilotos
            const piloto1Select = document.getElementById('piloto1');
            const piloto2Select = document.getElementById('piloto2');
            const pilotos = Object.keys(data);

            pilotos.forEach(piloto => {
                const option1 = document.createElement('option');
                option1.value = piloto;
                option1.text = piloto;
                piloto1Select.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = piloto;
                option2.text = piloto;
                piloto2Select.appendChild(option2);
            });

            // Función para actualizar la gráfica
            function actualizarGrafica() {
                const piloto1 = piloto1Select.value;
                const piloto2 = piloto2Select.value;

                const datos_piloto1 = {
                    x: data[piloto1].track,  // Orden de las pistas mantenido como está en CSV
                    y: data[piloto1].points,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: piloto1,
                    marker: { color: 'red' }
                };

                const datos_piloto2 = {
                    x: data[piloto2].track,  // Orden de las pistas mantenido como está en CSV
                    y: data[piloto2].points,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: piloto2,
                    marker: { color: 'blue' }
                };

                const layout = {
                    title: `Comparación de Rendimiento: ${piloto1} vs ${piloto2} en 2023`,
                    xaxis: { title: 'Tracks' },
                    yaxis: { title: 'Puntos' },
                    grid: true
                };

                Plotly.newPlot('grafica', [datos_piloto1, datos_piloto2], layout);
            }

            // Agregar eventos para actualizar la gráfica
            piloto1Select.addEventListener('change', actualizarGrafica);
            piloto2Select.addEventListener('change', actualizarGrafica);

            // Inicializar la gráfica con los valores predeterminados
            actualizarGrafica();
        }

        // Cargar los datos cuando la página se cargue
        cargarDatos();