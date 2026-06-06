import React, { useState, useEffect } from 'react';

const questionBank = [
  // CARDIOLOGY
  {
    topic: "Cardiology",
    vignette: "68M with long-standing hypertension has progressive exertional dyspnea, chest pressure, and one episode of syncope. Exam shows a harsh systolic murmur radiating toward the neck.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral regurgitation", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits aortic stenosis: older patient with exertional dyspnea, angina/syncope, and a neck-radiating systolic murmur."
  },
  {
    topic: "Cardiology",
    vignette: "24M has repeated near-syncope during basketball practice. His father died suddenly at a young age. Exam shows a systolic murmur that becomes louder when he stands.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral valve prolapse", "Dilated cardiomyopathy"],
    correct: 1,
    explanation: "Young athlete with exertional syncope, family history of sudden death, and murmur louder with decreased preload fits hypertrophic cardiomyopathy."
  },
  {
    topic: "Cardiology",
    vignette: "58M with prior MI has worsening shortness of breath, orthopnea, leg swelling, bibasilar crackles, and an S3 gallop.",
    answers: ["Acute decompensated heart failure", "COPD exacerbation", "Pneumonia", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits decompensated heart failure: orthopnea, edema, crackles, and S3 in a patient with cardiac disease."
  },
  {
    topic: "Cardiology",
    vignette: "63F has chest pressure that now occurs at rest and lasts longer than before. ECG shows new ischemic changes, but there is no ST elevation.",
    answers: ["Stable angina", "Acute coronary syndrome", "Pericarditis", "Aortic dissection"],
    correct: 1,
    explanation: "Chest pain at rest with new ischemic ECG changes fits acute coronary syndrome, even without ST elevation."
  },
  {
    topic: "Cardiology",
    vignette: "51M has severe substernal chest pain, diaphoresis, and nausea. ECG shows ST elevation in II, III, and aVF.",
    answers: ["Anterior MI", "Inferior MI", "Lateral MI", "Posterior MI"],
    correct: 1,
    explanation: "This presentation is an inferior MI: ischemic symptoms with ST elevation in II, III, and aVF."
  },
  {
    topic: "Cardiology",
    vignette: "45M has sudden severe chest pain radiating to his back. He is hypertensive, uncomfortable, and the blood pressure differs between arms.",
    answers: ["Acute MI", "Aortic dissection", "Pulmonary embolism", "Pericarditis"],
    correct: 1,
    explanation: "Sudden severe chest pain radiating to the back with unequal arm pressures fits aortic dissection."
  },
  {
    topic: "Cardiology",
    vignette: "36F has sharp chest pain that worsens with lying down and improves when sitting forward. She recently had a viral illness.",
    answers: ["Pericarditis", "Acute MI", "Pulmonary embolism", "GERD"],
    correct: 0,
    explanation: "Positional pleuritic chest pain after viral illness fits acute pericarditis."
  },
  {
    topic: "Cardiology",
    vignette: "72M with atrial fibrillation develops rapid palpitations, pulmonary edema, confusion, and low blood pressure.",
    answers: ["Oral anticoagulation", "IV beta-blocker only", "Immediate synchronized cardioversion", "Outpatient follow-up"],
    correct: 2,
    explanation: "Atrial fibrillation with hemodynamic instability requires immediate synchronized cardioversion."
  },
  {
    topic: "Cardiology",
    vignette: "47M has chest trauma followed by hypotension, distended neck veins, muffled heart sounds, and worsening dyspnea.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Acute MI", "Massive pulmonary embolism"],
    correct: 0,
    explanation: "Hypotension, JVD, muffled heart sounds, and trauma fit cardiac tamponade."
  },
  {
    topic: "Cardiology",
    vignette: "60F has sudden pleuritic chest pain, dyspnea, tachycardia, and oxygen desaturation after a long flight.",
    answers: ["Acute coronary syndrome", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correct: 1,
    explanation: "Acute pleuritic chest pain, dyspnea, tachycardia, hypoxemia, and recent immobility fit pulmonary embolism."
  },

  // PULMONOLOGY
  {
    topic: "Pulmonology",
    vignette: "42M has sudden pleuritic chest pain and dyspnea after minor chest trauma. One side has decreased breath sounds and hyperresonance, but he is hemodynamically stable.",
    answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"],
    correct: 2,
    explanation: "Unilateral pleuritic pain, decreased breath sounds, and hyperresonance without shock fits simple pneumothorax."
  },
  {
    topic: "Pulmonology",
    vignette: "28F has progressive dry cough, dyspnea, fatigue, tender red nodules on her shins, and bilateral hilar fullness on chest imaging.",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Goodpasture syndrome"],
    correct: 0,
    explanation: "Young adult with pulmonary symptoms, erythema nodosum, and bilateral hilar lymphadenopathy fits sarcoidosis."
  },
  {
    topic: "Pulmonology",
    vignette: "55M has months of cough, night sweats, weight loss, and intermittent hemoptysis. Chest imaging shows an upper-lobe cavitary lesion.",
    answers: ["Sarcoidosis", "Community-acquired pneumonia", "Tuberculosis", "Pulmonary edema"],
    correct: 2,
    explanation: "Chronic cough, constitutional symptoms, hemoptysis, and upper-lobe cavitation fit active tuberculosis."
  },
  {
    topic: "Pulmonology",
    vignette: "62M with known heart disease develops acute dyspnea, pink frothy sputum, diffuse crackles, and worsening symptoms when lying flat.",
    answers: ["COPD exacerbation", "Cardiogenic pulmonary edema", "Pneumonia", "Spontaneous pneumothorax"],
    correct: 1,
    explanation: "Acute dyspnea with orthopnea, diffuse crackles, and pink frothy sputum fits cardiogenic pulmonary edema."
  },
  {
    topic: "Pulmonology",
    vignette: "26F has recurrent episodes of wheezing, cough, and chest tightness that worsen at night and improve after using an inhaler.",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Pulmonary embolism"],
    correct: 0,
    explanation: "Episodic wheezing and cough with nighttime worsening and bronchodilator response fits asthma."
  },
  {
    topic: "Pulmonology",
    vignette: "32M has sudden pleuritic chest pain, dyspnea, tachycardia, and low oxygen saturation after several days of leg immobilization.",
    answers: ["Pneumonia", "Acute coronary syndrome", "Pulmonary embolism", "Pericarditis"],
    correct: 2,
    explanation: "Acute pleuritic pain, dyspnea, hypoxemia, tachycardia, and recent immobilization fit pulmonary embolism."
  },
  {
    topic: "Pulmonology",
    vignette: "44F keeps birds at home and develops cough, dyspnea, fatigue, and diffuse interstitial changes that worsen after exposure.",
    answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"],
    correct: 2,
    explanation: "Respiratory symptoms and interstitial findings triggered by bird exposure fit hypersensitivity pneumonitis."
  },
  {
    topic: "Pulmonology",
    vignette: "19M hospitalized with severe infection develops worsening hypoxemia and bilateral lung infiltrates despite no evidence of volume overload or heart failure.",
    answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Cardiogenic pulmonary edema"],
    correct: 1,
    explanation: "Severe inflammatory illness followed by hypoxemia and bilateral infiltrates without heart failure fits ARDS."
  },
  {
    topic: "Pulmonology",
    vignette: "56F with a long smoking history has chronic cough, weight loss, and a new irregular upper-lobe lung nodule on imaging.",
    answers: ["Benign granuloma", "Viral infection", "Lung cancer", "Pulmonary abscess"],
    correct: 2,
    explanation: "Smoking history, weight loss, cough, and irregular lung nodule fit lung cancer until proven otherwise."
  },
  {
    topic: "Pulmonology",
    vignette: "67M with COPD develops increased dyspnea, wheezing, cough, and sputum production over 2 days without chest pain or focal consolidation.",
    answers: ["COPD exacerbation", "Pulmonary embolism", "Acute heart failure", "Pneumothorax"],
    correct: 0,
    explanation: "Known COPD with acute worsening dyspnea, wheeze, cough, and sputum production fits COPD exacerbation."
  },

  // NEPHROLOGY
  {
    topic: "Nephrology",
    vignette: "48M in the ICU after sepsis develops a rapid creatinine rise and urine microscopy showing pigmented granular casts.",
    answers: ["Diabetic nephropathy", "Poststreptococcal glomerulonephritis", "Acute tubular necrosis", "Lupus nephritis"],
    correct: 2,
    explanation: "Sepsis followed by acute kidney injury and granular casts fits acute tubular necrosis."
  },
  {
    topic: "Nephrology",
    vignette: "24M develops visible blood in the urine two days after a sore throat. Blood pressure is elevated, but complement levels are normal.",
    answers: ["IgA nephropathy", "Poststreptococcal glomerulonephritis", "Membranoproliferative glomerulonephritis", "Minimal change disease"],
    correct: 0,
    explanation: "Hematuria within days of a respiratory infection with normal complement fits IgA nephropathy."
  },
  {
    topic: "Nephrology",
    vignette: "52M with long-standing poorly controlled diabetes develops leg swelling and heavy proteinuria over months.",
    answers: ["Minimal change disease", "FSGS", "Diabetic nephropathy", "Membranous nephropathy"],
    correct: 2,
    explanation: "Long-standing diabetes with gradual nephrotic-range proteinuria fits diabetic nephropathy."
  },
  {
    topic: "Nephrology",
    vignette: "41M with renal failure has weakness and palpitations. ECG shows tall peaked T waves and widening QRS complexes.",
    answers: ["IV calcium gluconate", "Loop diuretic only", "Oral potassium binder only", "Fluid restriction"],
    correct: 0,
    explanation: "Renal failure with ECG changes from hyperkalemia requires immediate cardiac membrane stabilization with IV calcium."
  },
  {
    topic: "Nephrology",
    vignette: "29F has recurrent flank pain and hematuria. Imaging shows enlarged kidneys with multiple bilateral cysts; her father needed dialysis.",
    answers: ["Pyelonephritis", "Autosomal dominant polycystic kidney disease", "Renal infarction", "Renal cell carcinoma"],
    correct: 1,
    explanation: "Bilateral renal cysts with family history of kidney failure fits autosomal dominant polycystic kidney disease."
  },
  {
    topic: "Nephrology",
    vignette: "58M is confused with low serum sodium. He appears euvolemic, and his urine remains concentrated rather than appropriately dilute.",
    answers: ["Hypovolemic hyponatremia", "SIADH", "Diabetes insipidus", "Primary polydipsia"],
    correct: 1,
    explanation: "Euvolemic hyponatremia with inappropriately concentrated urine fits SIADH."
  },
  {
    topic: "Nephrology",
    vignette: "67F with decades of poorly controlled hypertension has slowly progressive kidney dysfunction and mild proteinuria.",
    answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"],
    correct: 1,
    explanation: "Long-standing hypertension with gradual chronic kidney disease and mild proteinuria fits hypertensive nephrosclerosis."
  },
  {
    topic: "Nephrology",
    vignette: "39M has fever, flank pain, nausea, urinary frequency, and marked tenderness over one costovertebral angle.",
    answers: ["Cystitis", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"],
    correct: 2,
    explanation: "Fever, urinary symptoms, and flank/CVA tenderness fit pyelonephritis."
  },
  {
    topic: "Nephrology",
    vignette: "44F develops generalized edema and frothy urine. Urine protein is markedly elevated, but she has no hematuria or active urinary sediment.",
    answers: ["Nephritic syndrome", "Nephrotic syndrome", "Acute tubular necrosis", "Postrenal obstruction"],
    correct: 1,
    explanation: "Edema and heavy proteinuria without inflammatory urine findings fit nephrotic syndrome."
  },
  {
    topic: "Nephrology",
    vignette: "51M has sudden severe flank pain radiating to the groin with nausea and microscopic hematuria.",
    answers: ["Pyelonephritis", "Ureteral stone", "Renal cell carcinoma", "Glomerulonephritis"],
    correct: 1,
    explanation: "Colicky flank pain radiating to the groin with hematuria fits ureteral stone."
  },

  // GASTROENTEROLOGY
  {
    topic: "Gastroenterology",
    vignette: "48F has burning chest discomfort after meals, sour taste in her mouth, and symptoms that worsen when lying down.",
    answers: ["Peptic ulcer disease", "GERD", "Gastric cancer", "Acute pancreatitis"],
    correct: 1,
    explanation: "Postprandial burning, regurgitation, and worse symptoms when supine fit GERD."
  },
  {
    topic: "Gastroenterology",
    vignette: "62M with known cirrhosis suddenly vomits a large amount of blood and becomes lightheaded.",
    answers: ["Peptic ulcer bleeding", "Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia"],
    correct: 1,
    explanation: "Massive hematemesis in a patient with cirrhosis fits esophageal variceal bleeding."
  },
  {
    topic: "Gastroenterology",
    vignette: "34F has steady right upper quadrant pain after a fatty meal, fever, nausea, and tenderness that worsens with inspiration.",
    answers: ["Biliary colic", "Acute cholecystitis", "Acute pancreatitis", "Viral hepatitis"],
    correct: 1,
    explanation: "Persistent RUQ pain with fever and inspiratory tenderness fits acute cholecystitis."
  },
  {
    topic: "Gastroenterology",
    vignette: "58M has severe epigastric pain radiating to the back after heavy alcohol use, with repeated vomiting.",
    answers: ["GERD", "Acute pancreatitis", "Acute MI", "Peptic ulcer disease"],
    correct: 1,
    explanation: "Severe epigastric pain radiating to the back after alcohol use fits acute pancreatitis."
  },
  {
    topic: "Gastroenterology",
    vignette: "42M has chronic diarrhea, weight loss, bloating, fatigue, and iron deficiency that improve when he avoids wheat-containing foods.",
    answers: ["Crohn disease", "Celiac disease", "IBS", "Lactose intolerance"],
    correct: 1,
    explanation: "Malabsorptive symptoms with iron deficiency and wheat sensitivity fit celiac disease."
  },
  {
    topic: "Gastroenterology",
    vignette: "29F develops frequent watery diarrhea and abdominal cramping one week after completing antibiotics for sinusitis.",
    answers: ["Viral gastroenteritis", "C. difficile infection", "Salmonella gastroenteritis", "Crohn disease"],
    correct: 1,
    explanation: "Watery diarrhea after recent antibiotic exposure fits C. difficile infection."
  },
  {
    topic: "Gastroenterology",
    vignette: "51M with chronic hepatitis C has abdominal distension, jaundice, easy bruising, spider angiomas, and leg swelling.",
    answers: ["Acute hepatitis", "Decompensated cirrhosis", "Acute cholangitis", "Pancreatic cancer"],
    correct: 1,
    explanation: "Ascites, jaundice, bruising, spider angiomas, and edema in chronic liver disease fit decompensated cirrhosis."
  },
  {
    topic: "Gastroenterology",
    vignette: "37M has fever and steady left lower quadrant abdominal pain. CT shows inflammation around the sigmoid colon without perforation.",
    answers: ["Appendicitis", "Diverticulitis", "Ulcerative colitis", "Ischemic colitis"],
    correct: 1,
    explanation: "LLQ pain, fever, and sigmoid inflammation fit diverticulitis."
  },
  {
    topic: "Gastroenterology",
    vignette: "55F has years of abdominal discomfort with alternating diarrhea and constipation. Symptoms improve after bowel movements, and she has no weight loss.",
    answers: ["Crohn disease", "Ulcerative colitis", "Irritable bowel syndrome", "Celiac disease"],
    correct: 2,
    explanation: "Chronic abdominal discomfort linked to bowel habits without alarm features fits IBS."
  },
  {
    topic: "Gastroenterology",
    vignette: "46M has progressive difficulty swallowing solids, then liquids, along with unintentional weight loss.",
    answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"],
    correct: 2,
    explanation: "Progressive dysphagia with weight loss, especially starting with solids, fits esophageal cancer."
  },

  // ENDOCRINOLOGY
  {
    topic: "Endocrinology",
    vignette: "19M has polyuria, weight loss, abdominal pain, deep rapid breathing, dehydration, and very high glucose.",
    answers: ["Type 2 diabetes", "Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Hypoglycemia"],
    correct: 1,
    explanation: "Young patient with hyperglycemia, weight loss, dehydration, abdominal pain, and deep breathing fits DKA."
  },
  {
    topic: "Endocrinology",
    vignette: "68F with type 2 diabetes is confused and severely dehydrated. Glucose is extremely high, but she has minimal acidosis.",
    answers: ["Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Lactic acidosis", "Hypoglycemia"],
    correct: 1,
    explanation: "Older type 2 diabetic with extreme hyperglycemia, dehydration, confusion, and minimal acidosis fits HHS."
  },
  {
    topic: "Endocrinology",
    vignette: "58M has weight loss despite increased appetite, tremor, heat intolerance, palpitations, and a diffusely enlarged thyroid.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroid cancer", "Central hypothyroidism"],
    correct: 1,
    explanation: "Weight loss, heat intolerance, tremor, palpitations, and goiter fit hyperthyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "42F has fatigue, weight gain, cold intolerance, constipation, dry skin, and a slow heart rate.",
    answers: ["Hyperthyroidism", "Hypothyroidism", "Adrenal insufficiency", "Cushing syndrome"],
    correct: 1,
    explanation: "Cold intolerance, weight gain, constipation, dry skin, and bradycardia fit hypothyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "51M has resistant hypertension, muscle weakness, low potassium, and metabolic alkalosis despite no diuretic use.",
    answers: ["Primary hyperaldosteronism", "Pheochromocytoma", "Addison disease", "SIADH"],
    correct: 0,
    explanation: "Resistant hypertension with hypokalemia and metabolic alkalosis fits primary hyperaldosteronism."
  },
  {
    topic: "Endocrinology",
    vignette: "38F has central weight gain, easy bruising, facial rounding, proximal muscle weakness, and new hypertension.",
    answers: ["Adrenal insufficiency", "Cushing syndrome", "Hypothyroidism", "PCOS"],
    correct: 1,
    explanation: "Central obesity, bruising, proximal weakness, facial rounding, and hypertension fit Cushing syndrome."
  },
  {
    topic: "Endocrinology",
    vignette: "26F has irregular menses, acne, increased facial hair, weight gain, and difficulty becoming pregnant.",
    answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"],
    correct: 1,
    explanation: "Irregular menses with hyperandrogenic features and infertility fits PCOS."
  },
  {
    topic: "Endocrinology",
    vignette: "67M has recurrent kidney stones, constipation, bone pain, fatigue, and persistently elevated calcium.",
    answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide effect"],
    correct: 2,
    explanation: "Stones, bones, abdominal symptoms, fatigue, and high calcium fit primary hyperparathyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "52F after menopause has a low-trauma wrist fracture and reduced bone density on screening.",
    answers: ["Normal aging", "Osteopenia", "Osteoporosis", "Osteomalacia"],
    correct: 2,
    explanation: "Postmenopausal low-trauma fracture with reduced bone density fits osteoporosis."
  },
  {
    topic: "Endocrinology",
    vignette: "41M has recurrent fasting episodes of sweating, confusion, and tremor that improve quickly after eating.",
    answers: ["Factitious insulin use", "Insulinoma", "Panic disorder", "Adrenal insufficiency"],
    correct: 1,
    explanation: "Recurrent fasting hypoglycemic symptoms relieved by food fit insulinoma."
  },

  // HEMATOLOGY
  {
    topic: "Hematology",
    vignette: "52F has fatigue, shortness of breath, heavy menstrual bleeding, pale conjunctiva, and small red blood cells on CBC.",
    answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia trait"],
    correct: 1,
    explanation: "Microcytic anemia with chronic blood loss symptoms fits iron deficiency anemia."
  },
  {
    topic: "Hematology",
    vignette: "67M has fatigue, numbness in his feet, gait instability, a smooth tongue, and enlarged red blood cells.",
    answers: ["Folate deficiency", "Vitamin B12 deficiency", "Hypothyroidism", "Reticulocytosis"],
    correct: 1,
    explanation: "Macrocytic anemia with neurologic symptoms and glossitis fits vitamin B12 deficiency."
  },
  {
    topic: "Hematology",
    vignette: "38F has fatigue, jaundice, dark urine, mild splenomegaly, and anemia after a recent viral illness.",
    answers: ["Iron deficiency anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolytic anemia"],
    correct: 3,
    explanation: "Acute hemolytic anemia after illness with jaundice, dark urine, and splenomegaly fits autoimmune hemolysis."
  },
  {
    topic: "Hematology",
    vignette: "4YO has recurrent episodes of severe bone pain, anemia, jaundice, and infections with encapsulated organisms.",
    answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"],
    correct: 2,
    explanation: "Child with vaso-occlusive pain episodes, hemolysis, and functional asplenia fits sickle cell disease."
  },
  {
    topic: "Hematology",
    vignette: "64M has fatigue, frequent infections, easy bruising, and low red cells, white cells, and platelets.",
    answers: ["ITP", "TTP", "DIC", "Aplastic anemia"],
    correct: 3,
    explanation: "Pancytopenia with infections, bruising, and fatigue fits aplastic anemia."
  },
  {
    topic: "Hematology",
    vignette: "23F has fever, confusion, kidney injury, bruising, low platelets, and evidence of red cell fragmentation.",
    answers: ["ITP", "DIC", "TTP", "Hemophilia A"],
    correct: 2,
    explanation: "Thrombocytopenia, neurologic changes, kidney injury, fever, and hemolysis fit TTP."
  },
  {
    topic: "Hematology",
    vignette: "58M has fatigue, recurrent infections, gum bleeding, very high white count, anemia, and many immature cells on smear.",
    answers: ["Chronic myeloid leukemia", "Acute leukemia", "Leukemoid reaction", "Chronic lymphocytic leukemia"],
    correct: 1,
    explanation: "Infections, bleeding, anemia, and many immature cells fit acute leukemia."
  },
  {
    topic: "Hematology",
    vignette: "72M has back pain, fatigue, recurrent infections, kidney dysfunction, and elevated serum protein.",
    answers: ["Waldenström macroglobulinemia", "Multiple myeloma", "Hodgkin lymphoma", "CLL"],
    correct: 1,
    explanation: "Bone pain, anemia/fatigue, renal dysfunction, infections, and high protein fit multiple myeloma."
  },
  {
    topic: "Hematology",
    vignette: "46F taking warfarin has a very high INR discovered on routine testing, but she has no bleeding.",
    answers: ["Fresh frozen plasma", "Vitamin K and hold warfarin", "Platelet transfusion", "Protamine"],
    correct: 1,
    explanation: "Very high INR without bleeding is managed by holding warfarin and giving vitamin K."
  },
  {
    topic: "Hematology",
    vignette: "31M has painless neck lymph node enlargement, fevers, night sweats, weight loss, and itching.",
    answers: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Tuberculosis", "Reactive lymphadenopathy"],
    correct: 1,
    explanation: "Young adult with painless lymphadenopathy and B symptoms fits Hodgkin lymphoma."
  },

  // INFECTIOUS DISEASE
  {
    topic: "Infectious Disease",
    vignette: "47M with pneumonia becomes confused and hypotensive despite fluids. He is febrile, tachycardic, and has signs of poor perfusion.",
    answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"],
    correct: 0,
    explanation: "Infection with persistent hypotension and organ dysfunction fits septic shock."
  },
  {
    topic: "Infectious Disease",
    vignette: "34M has fever, severe headache, neck stiffness, photophobia, confusion, and a rapidly worsening petechial rash.",
    answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"],
    correct: 1,
    explanation: "Acute fever, meningismus, confusion, and petechial rash fit bacterial meningitis."
  },
  {
    topic: "Infectious Disease",
    vignette: "28M has fever, confusion, personality changes, focal seizures, and progressive neurologic decline over two days.",
    answers: ["Bacterial meningitis", "Viral meningitis", "Herpes encephalitis", "Fungal meningitis"],
    correct: 2,
    explanation: "Fever with encephalopathy, behavior change, and focal seizures fits herpes encephalitis."
  },
  {
    topic: "Infectious Disease",
    vignette: "52M with a prosthetic valve has persistent fever, a new murmur, small painful finger nodules, and embolic skin findings.",
    answers: ["Infective endocarditis", "Pericarditis", "Myocarditis", "Pneumonia"],
    correct: 0,
    explanation: "Fever, new murmur, prosthetic valve, and embolic findings fit infective endocarditis."
  },
  {
    topic: "Infectious Disease",
    vignette: "39F has watery diarrhea and crampy abdominal pain after eating undercooked poultry. She is stable and not immunocompromised.",
    answers: ["Immediate antibiotics", "Supportive care", "Urgent surgery", "Antitoxin"],
    correct: 1,
    explanation: "Stable noninvasive foodborne diarrhea after poultry exposure is usually managed supportively."
  },
  {
    topic: "Infectious Disease",
    vignette: "5YO unvaccinated child has high fever, cough, runny nose, red eyes, and a spreading rash that began on the face.",
    answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"],
    correct: 1,
    explanation: "Unvaccinated child with fever, cough/coryza/conjunctivitis, and face-first spreading rash fits measles."
  },
  {
    topic: "Infectious Disease",
    vignette: "31M has a painful genital ulcer and tender swollen inguinal lymph nodes after unprotected sex.",
    answers: ["Genital herpes", "Syphilis", "Chancroid", "Granuloma inguinale"],
    correct: 2,
    explanation: "Painful genital ulcer with tender lymphadenopathy fits chancroid."
  },
  {
    topic: "Infectious Disease",
    vignette: "27F with advanced HIV has progressive dyspnea, dry cough, fever, low oxygen saturation, and diffuse bilateral hazy infiltrates.",
    answers: ["Bacterial pneumonia", "Tuberculosis", "Pneumocystis pneumonia", "CMV pneumonitis"],
    correct: 2,
    explanation: "Advanced HIV with dry cough, hypoxemia, and diffuse bilateral infiltrates fits Pneumocystis pneumonia."
  },
  {
    topic: "Infectious Disease",
    vignette: "52M develops jaundice, fatigue, dark urine, and right upper quadrant discomfort several weeks after a needlestick injury.",
    answers: ["Chronic hepatitis B", "Acute hepatitis B", "Resolved hepatitis B", "Hepatitis B immunity"],
    correct: 1,
    explanation: "New jaundice and hepatitis symptoms weeks after blood exposure fit acute hepatitis B."
  },
  {
    topic: "Infectious Disease",
    vignette: "48M returns from West Africa with recurrent fevers, shaking chills, sweats, jaundice, and anemia.",
    answers: ["Dengue", "Typhoid fever", "Malaria", "Leptospirosis"],
    correct: 2,
    explanation: "Recurrent fever with chills, sweats, anemia, and travel to an endemic region fits malaria."
  },

  // NEUROLOGY
  {
    topic: "Neurology",
    vignette: "67M suddenly develops right arm weakness, facial droop, and difficulty speaking while eating breakfast. Symptoms began 2 hours ago.",
    answers: ["TIA", "Hemorrhagic stroke", "Acute ischemic stroke", "Todd paralysis"],
    correct: 2,
    explanation: "Sudden focal neurologic deficit within hours fits acute ischemic stroke until proven otherwise."
  },
  {
    topic: "Neurology",
    vignette: "54F has the worst headache of her life that began abruptly during exercise, with vomiting, neck stiffness, and photophobia.",
    answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Cluster headache"],
    correct: 2,
    explanation: "Abrupt thunderclap headache with meningismus fits subarachnoid hemorrhage."
  },
  {
    topic: "Neurology",
    vignette: "8YO has a generalized convulsion that continues for more than 5 minutes and does not stop spontaneously.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Syncope"],
    correct: 1,
    explanation: "A seizure lasting more than 5 minutes fits status epilepticus."
  },
  {
    topic: "Neurology",
    vignette: "42F wakes up with one-sided facial weakness involving the mouth, eye closure, and forehead, without arm or leg symptoms.",
    answers: ["Stroke", "Bell palsy", "Trigeminal neuralgia", "Myasthenia gravis"],
    correct: 1,
    explanation: "Complete unilateral facial weakness including forehead without limb deficits fits Bell palsy."
  },
  {
    topic: "Neurology",
    vignette: "38M develops progressive leg weakness that ascends over days after diarrhea. Reflexes are absent, and breathing feels harder.",
    answers: ["Transverse myelitis", "Guillain-Barré syndrome", "ALS", "Spinal cord compression"],
    correct: 1,
    explanation: "Ascending weakness with areflexia after infection fits Guillain-Barré syndrome."
  },
  {
    topic: "Neurology",
    vignette: "55F has slowly progressive memory loss, difficulty managing finances, getting lost in familiar places, and impaired daily functioning.",
    answers: ["Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Alzheimer disease"],
    correct: 3,
    explanation: "Gradual memory-predominant decline that impairs daily function fits Alzheimer disease."
  },
  {
    topic: "Neurology",
    vignette: "31M has drooping eyelids and double vision that worsen by evening, plus weakness that improves after rest.",
    answers: ["Myasthenia gravis", "Lambert-Eaton syndrome", "Polymyositis", "Thyroid eye disease"],
    correct: 0,
    explanation: "Fatigable ocular and generalized weakness that improves with rest fits myasthenia gravis."
  },
  {
    topic: "Neurology",
    vignette: "58M has slowly worsening hand tremor at rest, small handwriting, stiffness, slow movements, and a shuffling gait.",
    answers: ["Essential tremor", "Parkinson disease", "Cerebellar ataxia", "Dystonia"],
    correct: 1,
    explanation: "Rest tremor, bradykinesia, rigidity, and shuffling gait fit Parkinson disease."
  },
  {
    topic: "Neurology",
    vignette: "24F has episodes of vision loss, limb numbness, and imbalance that occurred months apart and partially resolved each time.",
    answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"],
    correct: 2,
    explanation: "Neurologic episodes separated in time and involving different CNS areas fit multiple sclerosis."
  },
  {
    topic: "Neurology",
    vignette: "68M has recurrent episodes of spinning vertigo lasting hours, with ringing, ear fullness, and fluctuating hearing loss in one ear.",
    answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"],
    correct: 2,
    explanation: "Recurrent vertigo with unilateral hearing symptoms and ear fullness fits Ménière disease."
  },

  // PSYCHIATRY
  {
    topic: "Psychiatry",
    vignette: "32F has 3 weeks of low mood, loss of interest, insomnia, guilt, poor concentration, low energy, and thoughts of death.",
    answers: ["Adjustment disorder", "Major depressive disorder", "Persistent depressive disorder", "Bipolar disorder"],
    correct: 1,
    explanation: "Multiple depressive symptoms lasting more than 2 weeks with impairment fit major depressive disorder."
  },
  {
    topic: "Psychiatry",
    vignette: "28M has one week of little sleep, pressured speech, grandiosity, risky spending, and irritability severe enough to require hospitalization.",
    answers: ["ADHD", "Mania", "Generalized anxiety disorder", "Hypomania"],
    correct: 1,
    explanation: "Elevated/irritable mood with decreased sleep, risky behavior, and hospitalization fits mania."
  },
  {
    topic: "Psychiatry",
    vignette: "45M has excessive worry about work, health, finances, and family on most days for many months, with muscle tension and poor sleep.",
    answers: ["Social anxiety disorder", "Generalized anxiety disorder", "Panic disorder", "Specific phobia"],
    correct: 1,
    explanation: "Chronic excessive worry across multiple domains with somatic tension fits generalized anxiety disorder."
  },
  {
    topic: "Psychiatry",
    vignette: "35F has recurrent sudden episodes of palpitations, sweating, shortness of breath, and fear of dying, followed by worry about future attacks.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "Panic disorder", "Social anxiety disorder"],
    correct: 2,
    explanation: "Unexpected panic attacks with persistent worry about recurrence fit panic disorder."
  },
  {
    topic: "Psychiatry",
    vignette: "52M veteran has nightmares, intrusive memories, avoidance of reminders, irritability, and hypervigilance months after combat trauma.",
    answers: ["Adjustment disorder", "PTSD", "Acute stress disorder", "Generalized anxiety disorder"],
    correct: 1,
    explanation: "Trauma exposure followed by intrusion, avoidance, and hyperarousal for months fits PTSD."
  },
  {
    topic: "Psychiatry",
    vignette: "28F spends hours washing her hands because of intrusive contamination fears, even though she knows the behavior is excessive.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "OCD", "Body dysmorphic disorder"],
    correct: 2,
    explanation: "Intrusive obsessions plus repetitive compulsions with distress fit OCD."
  },
  {
    topic: "Psychiatry",
    vignette: "24M has months of social withdrawal, disorganized speech, auditory hallucinations, fixed paranoid beliefs, and declining function.",
    answers: ["Brief psychotic disorder", "Schizophreniform disorder", "Schizophrenia", "Delusional disorder"],
    correct: 2,
    explanation: "Chronic psychosis with functional decline over months fits schizophrenia."
  },
  {
    topic: "Psychiatry",
    vignette: "41F repeatedly eats large amounts in secret, feels loss of control, then vomits and exercises intensely. Her BMI is normal.",
    answers: ["Anorexia nervosa", "Bulimia nervosa", "Binge eating disorder", "Avoidant restrictive food intake disorder"],
    correct: 1,
    explanation: "Binge eating with compensatory behaviors and normal BMI fits bulimia nervosa."
  },
  {
    topic: "Psychiatry",
    vignette: "49M with heavy alcohol use stops drinking and develops tremor, sweating, anxiety, tachycardia, and hypertension the next morning.",
    answers: ["Wernicke encephalopathy", "Alcohol withdrawal", "Delirium tremens", "Hepatic encephalopathy"],
    correct: 1,
    explanation: "Autonomic hyperactivity and tremor within hours after stopping alcohol fit alcohol withdrawal."
  },
  {
    topic: "Psychiatry",
    vignette: "38M has a long pattern of grandiosity, entitlement, exploiting others, needing admiration, and dismissing other people’s feelings.",
    answers: ["Borderline personality disorder", "Narcissistic personality disorder", "Antisocial personality disorder", "Histrionic personality disorder"],
    correct: 1,
    explanation: "Grandiosity, need for admiration, entitlement, and lack of empathy fit narcissistic personality disorder."
  },

  // RHEUMATOLOGY
  {
    topic: "Rheumatology",
    vignette: "52F has months of symmetric pain and swelling in her wrists and finger joints, with morning stiffness lasting more than an hour.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Systemic lupus erythematosus", "Gout"],
    correct: 1,
    explanation: "Symmetric inflammatory small-joint arthritis with prolonged morning stiffness fits rheumatoid arthritis."
  },
  {
    topic: "Rheumatology",
    vignette: "35F has photosensitive facial rash, oral ulcers, joint pain, fatigue, and intermittent pleuritic chest discomfort.",
    answers: ["Sjögren syndrome", "Systemic sclerosis", "Systemic lupus erythematosus", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "Photosensitive rash, oral ulcers, arthritis, and serositis symptoms fit systemic lupus erythematosus."
  },
  {
    topic: "Rheumatology",
    vignette: "48M has sudden severe pain, redness, and swelling of one big toe after a weekend of alcohol and heavy meals.",
    answers: ["Rheumatoid arthritis", "Pseudogout", "Gout", "Septic arthritis"],
    correct: 2,
    explanation: "Acute intensely painful first-toe monoarthritis after alcohol/heavy meals fits gout."
  },
  {
    topic: "Rheumatology",
    vignette: "64F has sudden painful swelling of one knee. She has a history of osteoarthritis and recurrent similar knee attacks.",
    answers: ["Gout", "Pseudogout", "Rheumatoid arthritis", "Polymyalgia rheumatica"],
    correct: 1,
    explanation: "Older patient with recurrent acute knee monoarthritis and osteoarthritis history fits pseudogout."
  },
  {
    topic: "Rheumatology",
    vignette: "67M has new aching and stiffness in both shoulders and hips, worse in the morning, without true muscle weakness.",
    answers: ["Rheumatoid arthritis", "Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis"],
    correct: 1,
    explanation: "Older patient with shoulder/hip girdle pain and morning stiffness without weakness fits polymyalgia rheumatica."
  },
  {
    topic: "Rheumatology",
    vignette: "72F has new temporal headache, scalp tenderness while brushing hair, jaw pain while chewing, and transient vision loss.",
    answers: ["Polymyalgia rheumatica", "Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa"],
    correct: 1,
    explanation: "Older patient with temporal headache, scalp tenderness, jaw claudication, and visual symptoms fits giant cell arteritis."
  },
  {
    topic: "Rheumatology",
    vignette: "58M has progressive skin tightening of the fingers, Raynaud episodes, reflux, and difficulty swallowing solids.",
    answers: ["SLE", "Sjögren syndrome", "Systemic sclerosis", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "Skin tightening, Raynaud phenomenon, reflux, and dysphagia fit systemic sclerosis."
  },
  {
    topic: "Rheumatology",
    vignette: "41M has chronic low back pain that improves with exercise, morning stiffness, and reduced spinal flexibility.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Ankylosing spondylitis", "Gout"],
    correct: 2,
    explanation: "Inflammatory back pain with morning stiffness and reduced spinal mobility fits ankylosing spondylitis."
  },
  {
    topic: "Rheumatology",
    vignette: "44F has persistent dry eyes, dry mouth, dental caries, parotid swelling, and aching joints.",
    answers: ["SLE", "Rheumatoid arthritis", "Sjögren syndrome", "Systemic sclerosis"],
    correct: 2,
    explanation: "Dry eyes, dry mouth, parotid swelling, dental issues, and arthralgias fit Sjögren syndrome."
  },
  {
    topic: "Rheumatology",
    vignette: "52M has palpable purpura on the legs, hematuria, cough with blood-streaked sputum, and worsening kidney function.",
    answers: ["Polyarteritis nodosa", "Microscopic polyangiitis", "Granulomatosis with polyangiitis", "Takayasu arteritis"],
    correct: 1,
    explanation: "Small-vessel skin, kidney, and pulmonary involvement fits microscopic polyangiitis."
  }
];

export default function ReflexTrainer() {
  const [gameStarted, setGameStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  const generateNewSession = () => {
    const topics = [...new Set(questionBank.map((q) => q.topic))];
    const selectedTopics = topics.sort(() => Math.random() - 0.5).slice(0, 10);

    const newQuestions = selectedTopics.map((topic) => {
      const topicQuestions = questionBank.filter((q) => q.topic === topic);
      return topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
    });

    setSessionQuestions(newQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShuffledAnswers([]);
    setTimeLeft(15);
    setTimerActive(true);
    setSessionComplete(false);
  };

  const startGame = () => {
    setGameStarted(true);
    generateNewSession();
  };

  const current = sessionQuestions[currentQIndex];

  useEffect(() => {
    if (!gameStarted || !current || sessionComplete) return;

    const shuffled = [...current.answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(15);
    setTimerActive(true);
  }, [currentQIndex, current, gameStarted, sessionComplete]);

  useEffect(() => {
    if (!gameStarted || !timerActive || answered || sessionComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          setAnswered(true);
          setStreak(0);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, timerActive, answered, sessionComplete]);

  const handleAnswer = (index) => {
    if (!current) return;

    const isCorrect =
      shuffledAnswers[index] === current.answers[current.correct];

    setSelectedAnswer(index);
    setAnswered(true);
    setTimerActive(false);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setScore((prev) => prev + 1);
      setStreak(nextStreak);

      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < sessionQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setSessionComplete(true);
      setTimerActive(false);
    }
  };

  const accuracy =
    Math.round((score / (currentQIndex + (answered ? 1 : 0))) * 100) || 0;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              STEP 2 CK Reflex Trainer
            </h1>

            <p className="text-indigo-200 text-base md:text-xl mb-6 leading-relaxed">
              Build faster clinical pattern recognition with short, timed Step 2 CK-style reflex questions.
            </p>

            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-7 rounded-full text-base md:text-lg transition shadow-lg"
            >
              Start Training your Reflexes
            </button>

            <p className="text-indigo-300 text-sm mt-5">
              Random 10-question sessions • 15 seconds per question
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const finalAccuracy =
      Math.round((score / sessionQuestions.length) * 100) || 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Session Complete
            </h1>

            <p className="text-indigo-200 text-base md:text-lg mb-6">
              Nice work. Here is how you did this round.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  {score}/10
                </div>
                <div className="text-xs md:text-sm text-indigo-200 mt-1">
                  Correct
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">
                  {finalAccuracy}%
                </div>
                <div className="text-xs md:text-sm text-indigo-200 mt-1">
                  Accuracy
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-orange-400">
                  {bestStreak}
                </div>
                <div className="text-xs md:text-sm text-indigo-200 mt-1">
                  Best streak
                </div>
              </div>
            </div>

            <p className="text-indigo-100 text-sm md:text-base mb-6 leading-relaxed">
              The goal is not just to get questions right, but to build faster recognition of clinical patterns under time pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={generateNewSession}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-7 rounded-full transition"
              >
                Start New Session
              </button>

              <button
                onClick={() => {
                  setGameStarted(false);
                  setSessionComplete(false);
                  setTimerActive(false);
                  setSessionQuestions([]);
                  setCurrentQIndex(0);
                  setScore(0);
                  setStreak(0);
                  setAnswered(false);
                  setSelectedAnswer(null);
                  setShuffledAnswers([]);
                  setTimeLeft(15);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-7 rounded-full transition border border-white/20"
              >
                Back to Start
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-2 md:p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-3 md:mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            🏥 STEP 2 CK Reflex Trainer
          </h1>

          <p className="text-indigo-200 text-sm md:text-base">
            Random 10-Question Session • {sessionQuestions.length} questions loaded
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3 md:mb-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-400">
              {score}
            </div>
            <div className="text-[11px] md:text-xs text-indigo-200">
              Correct
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-xl md:text-2xl font-bold text-yellow-400">
              {streak}
            </div>
            <div className="text-[11px] md:text-xs text-indigo-200">
              Streak
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-xl md:text-2xl font-bold text-orange-400">
              {bestStreak}
            </div>
            <div className="text-[11px] md:text-xs text-indigo-200">
              Best
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-400">
              {accuracy}%
            </div>
            <div className="text-[11px] md:text-xs text-indigo-200">
              Accuracy
            </div>
          </div>
        </div>

        <div className="bg-white/95 rounded-xl p-4 md:p-5 mb-3 md:mb-4 shadow-2xl">
          <div className="mb-3 flex justify-between items-center gap-3">
            <div>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs md:text-sm font-semibold">
                {current.topic}
              </span>

              <span className="ml-2 text-slate-500 text-xs md:text-sm">
                Q{currentQIndex + 1}/10
              </span>
            </div>

            <div
              className={`text-2xl md:text-3xl font-bold ${
                timeLeft > 5
                  ? "text-green-600"
                  : timeLeft > 2
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {timeLeft}s
            </div>
          </div>

          <div className="w-full h-1.5 md:h-2 bg-slate-300 rounded-full mb-4 overflow-hidden">
            <div
              className={`h-full transition-all ${
                timeLeft > 5
                  ? "bg-green-500"
                  : timeLeft > 2
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4 leading-snug">
            {current.vignette}
          </h2>

          <div className="space-y-2">
            {shuffledAnswers.map((answer, idx) => {
              const isCorrect = answer === current.answers[current.correct];
              const isSelected = idx === selectedAnswer;

              let buttonStyle =
                "bg-white border-2 border-indigo-200 hover:border-indigo-400 text-slate-700";

              if (answered) {
                if (isCorrect) {
                  buttonStyle =
                    "bg-green-100 border-2 border-green-500 text-green-900";
                } else if (isSelected && !isCorrect) {
                  buttonStyle =
                    "bg-red-100 border-2 border-red-500 text-red-900";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !answered && handleAnswer(idx)}
                  disabled={answered || !timerActive}
                  className={`w-full p-2.5 md:p-3 rounded-lg font-medium text-left text-sm md:text-base leading-snug transition-all ${buttonStyle} disabled:cursor-default`}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`mt-3 p-3 rounded ${
                timeLeft === 0
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-amber-50 border-l-4 border-amber-500"
              }`}
            >
              <p
                className={`text-xs md:text-sm font-semibold leading-snug ${
                  timeLeft === 0 ? "text-red-900" : "text-amber-900"
                }`}
              >
                {timeLeft === 0 ? "⏱️ Time's up! " : "💡 "}
                {current.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          {answered && (
            <button
              onClick={nextQuestion}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition text-sm md:text-base"
            >
              {currentQIndex < sessionQuestions.length - 1
                ? "Next Question →"
                : "View Results →"}
            </button>
          )}

          <button
            onClick={generateNewSession}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-lg transition flex items-center gap-2 text-sm md:text-base"
          >
            🔄 New Session
          </button>
        </div>
      </div>
    </div>
  );
}
