let car: Car;


function submitCar() {
    let errores = 0;
    let plateInput = <HTMLInputElement>document.getElementById("plateInput");
    let brandInput = <HTMLInputElement>document.getElementById("brandInput");
    let colorInput = <HTMLInputElement>document.getElementById("colorInput");

    car = new Car(plateInput.value, colorInput.value, brandInput.value);
    showVehicle();
    showWheelForm();

}

function showVehicle() {
    let carTitle = <HTMLInputElement>document.getElementById("carTitle");
    let plateOutput = <HTMLInputElement>document.getElementById("plateOutput");
    let brandOutput = <HTMLInputElement>document.getElementById("brandOutput");
    let colorOutput = <HTMLInputElement>document.getElementById("colorOutput");

    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;

}

function submitWheelForm() {
    let errores = 0;

    for (let i = 1; i <= 4; i++) {
        let brandWheel = <HTMLInputElement>document.getElementById("brandWheel" + i);
        let diameterWheel = <HTMLInputElement>document.getElementById("diameterWheel" + i);

        let wheel_generica = new Wheel(Number(diameterWheel.value), brandWheel.value);
        car.addWheel(wheel_generica);

    }
    console.log(car)
    showWheels();

}

function showWheels() {
    let wheelTitle = <HTMLInputElement>document.getElementById("wheelTitle");
    let wheelOutput1 = <HTMLInputElement>document.getElementById("wheelOutput1");
    let wheelOutput2 = <HTMLInputElement>document.getElementById("wheelOutput2");
    let wheelOutput3 = <HTMLInputElement>document.getElementById("wheelOutput3");
    let wheelOutput4 = <HTMLInputElement>document.getElementById("wheelOutput4");

    wheelTitle.innerHTML = "Wheels:";
    wheelOutput1.innerHTML = "<b>Wheel 1:</b><br>  " + "Brand: " + car.wheels[0].brand + "  <br>Diameter: " + car.wheels[0].diameter;
    wheelOutput2.innerHTML = "<b>Wheel 2:</b><br>  " + "Brand: " + car.wheels[1].brand + "  <br>Diameter: " + car.wheels[1].diameter;
    wheelOutput3.innerHTML = "<b>Wheel 3:</b><br>  " + "Brand: " + car.wheels[2].brand + "  <br>Diameter: " + car.wheels[2].diameter;
    wheelOutput4.innerHTML = "<b>Wheel 4:</b><br>  " + "Brand: " + car.wheels[3].brand + "  <br>Diameter: " + car.wheels[3].diameter;
}


function showWheelForm() {
    let carForm = <HTMLInputElement>document.getElementById("create-car-form");
    let carWheel = <HTMLInputElement>document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";

}