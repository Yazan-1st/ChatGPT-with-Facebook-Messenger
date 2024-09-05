const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('mars-globe').appendChild(renderer.domElement);

// Create the Mars Globe
const geometry = new THREE.SphereGeometry(5, 50, 50);
const texture = new THREE.TextureLoader().load('assets/mars_texture.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const mars = new THREE.Mesh(geometry, material);
scene.add(mars);

camera.position.z = 12;

// Add rover markers
rovers.forEach((rover, index) => {
  const roverMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  const lat = THREE.Math.degToRad(90 - rover.lat);
  const long = THREE.Math.degToRad(rover.long);

  roverMarker.position.set(
    5 * Math.sin(lat) * Math.cos(long),
    5 * Math.cos(lat),
    5 * Math.sin(lat) * Math.sin(long)
  );

  roverMarker.userData = { rover };

  // Add click event listener for marker
  roverMarker.onClick = () => displayRoverDetails(rover);
  scene.add(roverMarker);
});

function animate() {
  requestAnimationFrame(animate);
  mars.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Handle resizing of the window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Display rover details
function displayRoverDetails(rover) {
  const detailsDiv = document.getElementById('rover-details');
  detailsDiv.innerHTML = `
    <h3>${rover.name}</h3>
    <p><strong>Year:</strong> ${rover.year}</p>
    <p>${rover.details}</p>
    <img src="${rover.image}" alt="${rover.name}" width="200">
  `;
}
