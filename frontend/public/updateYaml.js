const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const FILES_DIR = path.join(__dirname, 'files'); // Katalog z plikami
const YAML_PATH = path.join(__dirname, 'subjects.yaml'); // Ścieżka do YAML

// 1️⃣ Wczytaj pliki z katalogu
function getFiles() {
    if (!fs.existsSync(FILES_DIR)) {
      console.error(`❌ Katalog nie istnieje: ${FILES_DIR}`);
      return [];
    }
    const files = fs.readdirSync(FILES_DIR);
    console.log(`📂 Znalezione pliki:`, files);
    return files;
  }
  

// 2️⃣ Wczytaj i sparsuj YAML
function loadYaml() {
  if (!fs.existsSync(YAML_PATH)) return null;
  return yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));
}

// 3️⃣ Dopasuj pliki do przedmiotów na podstawie nazwy
function matchFilesToSubjects(files, yamlData) {
  const fileMap = {}; // Mapujemy pliki do przedmiotów

  files.forEach(file => {
    const match = file.match(/^(.+?)-.+?\..+$/); // Wyciągnij nazwę przedmiotu przed myślnikiem
    if (match) {
      const subjectName = match[1].trim();
      if (!fileMap[subjectName]) fileMap[subjectName] = [];
      fileMap[subjectName].push({ name: file, url: `/files/${file}` });
    }
  });

  // Przejdź przez semestry i przypisz pliki do przedmiotów
  Object.values(yamlData.semesters).forEach(semester => {
    semester.modules.forEach(module => {
      module.subjects.forEach(subject => {
        if (fileMap[subject.name]) {
          subject.files = fileMap[subject.name]; // Nadpisujemy listę plików
        }
      });
    });
  });

  return yamlData;
}

// 4️⃣ Zapisz YAML z powrotem do pliku
function saveYaml(yamlData) {
    if (!yamlData) {
      console.error('❌ Błąd: yamlData jest null lub undefined!');
      return;
    }
  
    console.log('📝 YAML przed zapisem:', JSON.stringify(yamlData, null, 2));
  
    try {
      const yamlStr = yaml.dump(yamlData, { noRefs: true, lineWidth: 1000 });
      console.log(`📥 Zapisuję plik YAML do: ${YAML_PATH}`);
      
      fs.writeFileSync(YAML_PATH, yamlStr, 'utf8');
      
      console.log(`✅ Plik zapisano poprawnie: ${YAML_PATH}`);
    } catch (error) {
      console.error('❌ Błąd podczas zapisu YAML:', error);
    }
  }
  

// 🔥 Uruchom aktualizację
function updateYaml() {
  console.log('📂 Odczytuję pliki...');
  const files = getFiles();
  
  console.log('📜 Wczytuję subjects.yaml...');
  let yamlData = loadYaml();
  if (!yamlData) {
    console.error('❌ Brak pliku subjects.yaml!');
    return;
  }

  console.log('🔄 Dopasowuję pliki do przedmiotów...');
  yamlData = matchFilesToSubjects(files, yamlData);

  console.log('💾 Zapisuję zmiany w subjects.yaml...');
  saveYaml(yamlData);

  console.log('✅ Gotowe! Pliki zostały przypisane do przedmiotów.');
}

// 🚀 Start
updateYaml();
