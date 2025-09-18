async function weatherforecast() {
            let weather=await fetch("https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current_weather=true") 
           let apparent_temperature=await fetch("https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current_weather=true&hourly=apparent_temperature")
           let air=await fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=31.5497&longitude=74.3436&hourly=pm10,pm2_5")

            let response=await weather.json()
             let apparentres=await apparent_temperature.json()
              let airres=await air.json()


            console.log(response)
            console.log(airres)
            console.log(apparentres)

             function getaqilabel(pm25){
              if(pm25 <=12) return "Good"
              if(pm25 <=35.4) return "Moderate"
              if(pm25 <=55.4) return "Poor"
              if(pm25 <=150.4) return "Unhealthy"
              return "Very Unhealthy"
             }
let pm25=airres.hourly.pm2_5[0]
let feelslike=apparentres.hourly.apparent_temperature[0].toFixed(0)
let temp=response.current_weather.temperature.toFixed(0)

                let top=document.querySelector(".topheading")
                 let container=document.querySelector(".container")
                let Infodiv=document.createElement("div")
                Infodiv.classList.add("Info")

                let headingdiv=document.createElement("div")
                headingdiv.classList.add("headings")

               let temptdiv=document.createElement("div")
               temptdiv.classList.add("currenttemp")
               temptdiv.innerHTML=`<b>${temp}°</b>`

                let timediv=document.createElement("div")
                timediv.classList.add("currenttime")
                setInterval(()=>{
                    let now=new Date()
                    let timedisplay=now.toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"})
                    timediv.innerHTML=`<b>${timedisplay}</b>`
                },1000)

                let airdiv=document.createElement("div")
                let aqilabel= getaqilabel(pm25)
                airdiv.classList.add("airquality")
                airdiv.innerHTML=`Air Quality <b>${aqilabel}</b>`
             
                let apparenttempdiv=document.createElement("div")
                apparenttempdiv.classList.add("apparent")
                apparenttempdiv.innerHTML=`Feels like <b>${feelslike}${apparentres.hourly_units.apparent_temperature}</b>`

            
                let windspeeddiv=document.createElement("div")
                windspeeddiv.classList.add("windspeed")
                windspeeddiv.innerHTML=`Wind <b>${response.current_weather.windspeed}km/h</b>`


                Infodiv.appendChild(temptdiv)
                headingdiv.appendChild(timediv)
                Infodiv.appendChild(airdiv)
                Infodiv.appendChild(apparenttempdiv)
                Infodiv.appendChild(windspeeddiv)

          top.appendChild(headingdiv)
          container.appendChild(Infodiv)
            }

            
        
        weatherforecast()