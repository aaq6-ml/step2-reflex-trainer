// App.jsx

import React, { useEffect, useMemo, useState } from "react";

const rawQuestionBank = [
  // =========================================================
  // BASIC MODE
  // =========================================================

  // CARDIOLOGY — BASIC
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "68M with long-standing hypertension has progressive exertional dyspnea, chest pressure, and one episode of syncope. Exam shows a harsh systolic murmur radiating toward the neck.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral regurgitation", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits aortic stenosis: older patient with exertional dyspnea, angina/syncope, and a neck-radiating systolic murmur."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "24M has repeated near-syncope during basketball practice. His father died suddenly at a young age. Exam shows a systolic murmur that becomes louder when he stands.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral valve prolapse", "Dilated cardiomyopathy"],
    correct: 1,
    explanation: "This presentation fits hypertrophic cardiomyopathy: young athlete with exertional syncope, family history of sudden death, and murmur louder with decreased preload."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "58M with prior MI has worsening shortness of breath, orthopnea, leg swelling, bibasilar crackles, and an S3 gallop.",
    answers: ["Acute decompensated heart failure", "COPD exacerbation", "Pneumonia", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits acute decompensated heart failure: orthopnea, edema, crackles, and S3 in a patient with cardiac disease."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "63F has chest pressure that now occurs at rest and lasts longer than before. ECG shows new ischemic changes, but there is no ST elevation.",
    answers: ["Stable angina", "Acute coronary syndrome", "Pericarditis", "Aortic dissection"],
    correct: 1,
    explanation: "This presentation fits acute coronary syndrome: chest pain at rest with new ischemic ECG changes, even without ST elevation."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "51M has severe substernal chest pain, diaphoresis, and nausea. ECG shows ST elevation in II, III, and aVF.",
    answers: ["Anterior MI", "Inferior MI", "Lateral MI", "Posterior MI"],
    correct: 1,
    explanation: "This presentation fits inferior MI: ischemic symptoms with ST elevation in II, III, and aVF."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "45M has sudden severe chest pain radiating to his back. He is hypertensive, uncomfortable, and the blood pressure differs between arms.",
    answers: ["Acute MI", "Aortic dissection", "Pulmonary embolism", "Pericarditis"],
    correct: 1,
    explanation: "This presentation fits aortic dissection: sudden severe chest pain radiating to the back with unequal arm pressures."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "36F has sharp chest pain that worsens with lying down and improves when sitting forward. She recently had a viral illness.",
    answers: ["Pericarditis", "Acute MI", "Pulmonary embolism", "GERD"],
    correct: 0,
    explanation: "This presentation fits pericarditis: positional pleuritic chest pain after viral illness."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "72M with atrial fibrillation develops rapid palpitations, pulmonary edema, confusion, and low blood pressure.",
    answers: ["Oral anticoagulation", "IV beta-blocker only", "Immediate synchronized cardioversion", "Outpatient follow-up"],
    correct: 2,
    explanation: "This presentation fits unstable atrial fibrillation: hemodynamic instability requires immediate synchronized cardioversion."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "47M has chest trauma followed by hypotension, distended neck veins, muffled heart sounds, and worsening dyspnea.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Acute MI", "Massive pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits cardiac tamponade: hypotension, JVD, muffled heart sounds, and trauma."
  },
  {
    topic: "Cardiology",
    mode: "Basic",
    vignette: "60F has sudden pleuritic chest pain, dyspnea, tachycardia, and oxygen desaturation after a long flight.",
    answers: ["Acute coronary syndrome", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correct: 1,
    explanation: "This presentation fits pulmonary embolism: acute pleuritic chest pain, dyspnea, tachycardia, hypoxemia, and recent immobility."
  },

  // PULMONOLOGY — BASIC
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "42M has sudden pleuritic chest pain and dyspnea after minor chest trauma. One side has decreased breath sounds and hyperresonance, but he is hemodynamically stable.",
    answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"],
    correct: 2,
    explanation: "This presentation fits simple pneumothorax: unilateral pleuritic pain, decreased breath sounds, and hyperresonance without shock."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "28F has progressive dry cough, dyspnea, fatigue, tender red nodules on her shins, and bilateral hilar fullness on chest imaging.",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Goodpasture syndrome"],
    correct: 0,
    explanation: "This presentation fits sarcoidosis: young adult with pulmonary symptoms, erythema nodosum, and bilateral hilar lymphadenopathy."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "55M has months of cough, night sweats, weight loss, and intermittent hemoptysis. Chest imaging shows an upper-lobe cavitary lesion.",
    answers: ["Sarcoidosis", "Community-acquired pneumonia", "Tuberculosis", "Pulmonary edema"],
    correct: 2,
    explanation: "This presentation fits tuberculosis: chronic cough, constitutional symptoms, hemoptysis, and upper-lobe cavitation."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "62M with known heart disease develops acute dyspnea, pink frothy sputum, diffuse crackles, and worsening symptoms when lying flat.",
    answers: ["COPD exacerbation", "Cardiogenic pulmonary edema", "Pneumonia", "Spontaneous pneumothorax"],
    correct: 1,
    explanation: "This presentation fits cardiogenic pulmonary edema: acute dyspnea with orthopnea, diffuse crackles, and pink frothy sputum."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "26F has recurrent episodes of wheezing, cough, and chest tightness that worsen at night and improve after using an inhaler.",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits asthma: episodic wheezing and cough with nighttime worsening and bronchodilator response."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "32M has sudden pleuritic chest pain, dyspnea, tachycardia, and low oxygen saturation after several days of leg immobilization.",
    answers: ["Pneumonia", "Acute coronary syndrome", "Pulmonary embolism", "Pericarditis"],
    correct: 2,
    explanation: "This presentation fits pulmonary embolism: acute pleuritic pain, dyspnea, hypoxemia, tachycardia, and recent immobilization."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "44F keeps birds at home and develops cough, dyspnea, fatigue, and diffuse interstitial changes that worsen after exposure.",
    answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"],
    correct: 2,
    explanation: "This presentation fits hypersensitivity pneumonitis: respiratory symptoms and interstitial findings triggered by bird exposure."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "19M hospitalized with severe infection develops worsening hypoxemia and bilateral lung infiltrates despite no evidence of volume overload or heart failure.",
    answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Cardiogenic pulmonary edema"],
    correct: 1,
    explanation: "This presentation fits ARDS: severe inflammatory illness followed by hypoxemia and bilateral infiltrates without heart failure."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "56F with a long smoking history has chronic cough, weight loss, and a new irregular upper-lobe lung nodule on imaging.",
    answers: ["Benign granuloma", "Viral infection", "Lung cancer", "Pulmonary abscess"],
    correct: 2,
    explanation: "This presentation fits lung cancer until proven otherwise: smoking history, weight loss, cough, and irregular lung nodule."
  },
  {
    topic: "Pulmonology",
    mode: "Basic",
    vignette: "67M with COPD develops increased dyspnea, wheezing, cough, and sputum production over 2 days without chest pain or focal consolidation.",
    answers: ["COPD exacerbation", "Pulmonary embolism", "Acute heart failure", "Pneumothorax"],
    correct: 0,
    explanation: "This presentation fits COPD exacerbation: known COPD with acute worsening dyspnea, wheeze, cough, and sputum production."
  },

  // NEPHROLOGY — BASIC
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "48M in the ICU after sepsis develops a rapid creatinine rise and urine microscopy showing pigmented granular casts.",
    answers: ["Diabetic nephropathy", "Poststreptococcal glomerulonephritis", "Acute tubular necrosis", "Lupus nephritis"],
    correct: 2,
    explanation: "This presentation fits acute tubular necrosis: sepsis followed by acute kidney injury and granular casts."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "24M develops visible blood in the urine two days after a sore throat. Blood pressure is elevated, but complement levels are normal.",
    answers: ["IgA nephropathy", "Poststreptococcal glomerulonephritis", "Membranoproliferative glomerulonephritis", "Minimal change disease"],
    correct: 0,
    explanation: "This presentation fits IgA nephropathy: hematuria within days of a respiratory infection with normal complement."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "52M with long-standing poorly controlled diabetes develops leg swelling and heavy proteinuria over months.",
    answers: ["Minimal change disease", "FSGS", "Diabetic nephropathy", "Membranous nephropathy"],
    correct: 2,
    explanation: "This presentation fits diabetic nephropathy: long-standing diabetes with gradual nephrotic-range proteinuria."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "41M with renal failure has weakness and palpitations. ECG shows tall peaked T waves and widening QRS complexes.",
    answers: ["IV calcium gluconate", "Loop diuretic only", "Oral potassium binder only", "Fluid restriction"],
    correct: 0,
    explanation: "This presentation fits severe hyperkalemia with ECG changes: immediate cardiac membrane stabilization with IV calcium is required."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "29F has recurrent flank pain and hematuria. Imaging shows enlarged kidneys with multiple bilateral cysts; her father needed dialysis.",
    answers: ["Pyelonephritis", "Autosomal dominant polycystic kidney disease", "Renal infarction", "Renal cell carcinoma"],
    correct: 1,
    explanation: "This presentation fits ADPKD: bilateral renal cysts with family history of kidney failure."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "58M is confused with low serum sodium. He appears euvolemic, and his urine remains concentrated rather than appropriately dilute.",
    answers: ["Hypovolemic hyponatremia", "SIADH", "Diabetes insipidus", "Primary polydipsia"],
    correct: 1,
    explanation: "This presentation fits SIADH: euvolemic hyponatremia with inappropriately concentrated urine."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "67F with decades of poorly controlled hypertension has slowly progressive kidney dysfunction and mild proteinuria.",
    answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"],
    correct: 1,
    explanation: "This presentation fits hypertensive nephrosclerosis: long-standing hypertension with gradual CKD and mild proteinuria."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "39M has fever, flank pain, nausea, urinary frequency, and marked tenderness over one costovertebral angle.",
    answers: ["Cystitis", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"],
    correct: 2,
    explanation: "This presentation fits pyelonephritis: fever, urinary symptoms, flank pain, and CVA tenderness."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "44F develops generalized edema and frothy urine. Urine protein is markedly elevated, but she has no hematuria or active urinary sediment.",
    answers: ["Nephritic syndrome", "Nephrotic syndrome", "Acute tubular necrosis", "Postrenal obstruction"],
    correct: 1,
    explanation: "This presentation fits nephrotic syndrome: edema and heavy proteinuria without inflammatory urine findings."
  },
  {
    topic: "Nephrology",
    mode: "Basic",
    vignette: "51M has sudden severe flank pain radiating to the groin with nausea and microscopic hematuria.",
    answers: ["Pyelonephritis", "Ureteral stone", "Renal cell carcinoma", "Glomerulonephritis"],
    correct: 1,
    explanation: "This presentation fits ureteral stone: colicky flank pain radiating to the groin with hematuria."
  },

  // GASTROENTEROLOGY/HEPATOLOGY — BASIC
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "48F has burning chest discomfort after meals, sour taste in her mouth, and symptoms that worsen when lying down.",
    answers: ["Peptic ulcer disease", "GERD", "Gastric cancer", "Acute pancreatitis"],
    correct: 1,
    explanation: "This presentation fits GERD: postprandial burning, regurgitation, and worse symptoms when supine."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "62M with known cirrhosis suddenly vomits a large amount of blood and becomes lightheaded.",
    answers: ["Peptic ulcer bleeding", "Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia"],
    correct: 1,
    explanation: "This presentation fits esophageal variceal bleeding: massive hematemesis in a patient with cirrhosis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "34F has steady right upper quadrant pain after a fatty meal, fever, nausea, and tenderness that worsens with inspiration.",
    answers: ["Biliary colic", "Acute cholecystitis", "Acute pancreatitis", "Viral hepatitis"],
    correct: 1,
    explanation: "This presentation fits acute cholecystitis: persistent RUQ pain with fever and inspiratory tenderness."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "58M has severe epigastric pain radiating to the back after heavy alcohol use, with repeated vomiting.",
    answers: ["GERD", "Acute pancreatitis", "Acute MI", "Peptic ulcer disease"],
    correct: 1,
    explanation: "This presentation fits acute pancreatitis: severe epigastric pain radiating to the back after alcohol use."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "42M has chronic diarrhea, weight loss, bloating, fatigue, and iron deficiency that improve when he avoids wheat-containing foods.",
    answers: ["Crohn disease", "Celiac disease", "IBS", "Lactose intolerance"],
    correct: 1,
    explanation: "This presentation fits celiac disease: malabsorptive symptoms with iron deficiency and wheat sensitivity."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "29F develops frequent watery diarrhea and abdominal cramping one week after completing antibiotics for sinusitis.",
    answers: ["Viral gastroenteritis", "C difficile infection", "Salmonella gastroenteritis", "Crohn disease"],
    correct: 1,
    explanation: "This presentation fits C difficile infection: watery diarrhea after recent antibiotic exposure."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "51M with chronic hepatitis C has abdominal distension, jaundice, easy bruising, spider angiomas, and leg swelling.",
    answers: ["Acute hepatitis", "Decompensated cirrhosis", "Acute cholangitis", "Pancreatic cancer"],
    correct: 1,
    explanation: "This presentation fits decompensated cirrhosis: ascites, jaundice, bruising, spider angiomas, and edema in chronic liver disease."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "37M has fever and steady left lower quadrant abdominal pain. CT shows inflammation around the sigmoid colon without perforation.",
    answers: ["Appendicitis", "Diverticulitis", "Ulcerative colitis", "Ischemic colitis"],
    correct: 1,
    explanation: "This presentation fits diverticulitis: LLQ pain, fever, and sigmoid inflammation."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "55F has years of abdominal discomfort with alternating diarrhea and constipation. Symptoms improve after bowel movements, and she has no weight loss.",
    answers: ["Crohn disease", "Ulcerative colitis", "Irritable bowel syndrome", "Celiac disease"],
    correct: 2,
    explanation: "This presentation fits IBS: chronic abdominal discomfort linked to bowel habits without alarm features."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Basic",
    vignette: "46M has progressive difficulty swallowing solids, then liquids, along with unintentional weight loss.",
    answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"],
    correct: 2,
    explanation: "This presentation fits esophageal cancer: progressive dysphagia with weight loss, especially starting with solids."
  },

  // ENDOCRINOLOGY — BASIC
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "19M has polyuria, weight loss, abdominal pain, deep rapid breathing, dehydration, and very high glucose.",
    answers: ["Type 2 diabetes", "Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Hypoglycemia"],
    correct: 1,
    explanation: "This presentation fits DKA: young patient with hyperglycemia, weight loss, dehydration, abdominal pain, and deep breathing."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "68F with type 2 diabetes is confused and severely dehydrated. Glucose is extremely high, but she has minimal acidosis.",
    answers: ["Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Lactic acidosis", "Hypoglycemia"],
    correct: 1,
    explanation: "This presentation fits HHS: older type 2 diabetic with extreme hyperglycemia, dehydration, confusion, and minimal acidosis."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "58M has weight loss despite increased appetite, tremor, heat intolerance, palpitations, and a diffusely enlarged thyroid.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroid cancer", "Central hypothyroidism"],
    correct: 1,
    explanation: "This presentation fits hyperthyroidism: weight loss, heat intolerance, tremor, palpitations, and goiter."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "42F has fatigue, weight gain, cold intolerance, constipation, dry skin, and a slow heart rate.",
    answers: ["Hyperthyroidism", "Hypothyroidism", "Adrenal insufficiency", "Cushing syndrome"],
    correct: 1,
    explanation: "This presentation fits hypothyroidism: cold intolerance, weight gain, constipation, dry skin, and bradycardia."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "51M has resistant hypertension, muscle weakness, low potassium, and metabolic alkalosis despite no diuretic use.",
    answers: ["Primary hyperaldosteronism", "Pheochromocytoma", "Addison disease", "SIADH"],
    correct: 0,
    explanation: "This presentation fits primary hyperaldosteronism: resistant hypertension with hypokalemia and metabolic alkalosis."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "38F has central weight gain, easy bruising, facial rounding, proximal muscle weakness, and new hypertension.",
    answers: ["Adrenal insufficiency", "Cushing syndrome", "Hypothyroidism", "PCOS"],
    correct: 1,
    explanation: "This presentation fits Cushing syndrome: central obesity, bruising, proximal weakness, facial rounding, and hypertension."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "26F has irregular menses, acne, increased facial hair, weight gain, and difficulty becoming pregnant.",
    answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"],
    correct: 1,
    explanation: "This presentation fits PCOS: irregular menses with hyperandrogenic features and infertility."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "67M has recurrent kidney stones, constipation, bone pain, fatigue, and persistently elevated calcium.",
    answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide effect"],
    correct: 2,
    explanation: "This presentation fits primary hyperparathyroidism: stones, bones, abdominal symptoms, fatigue, and high calcium."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "52F after menopause has a low-trauma wrist fracture and reduced bone density on screening.",
    answers: ["Normal aging", "Osteopenia", "Osteoporosis", "Osteomalacia"],
    correct: 2,
    explanation: "This presentation fits osteoporosis: postmenopausal low-trauma fracture with reduced bone density."
  },
  {
    topic: "Endocrinology",
    mode: "Basic",
    vignette: "41M has recurrent fasting episodes of sweating, confusion, and tremor that improve quickly after eating.",
    answers: ["Factitious insulin use", "Insulinoma", "Panic disorder", "Adrenal insufficiency"],
    correct: 1,
    explanation: "This presentation fits insulinoma: recurrent fasting hypoglycemic symptoms relieved by food."
  },

  // HEMATOLOGY/ONCOLOGY — BASIC
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "52F has fatigue, shortness of breath, heavy menstrual bleeding, pale conjunctiva, and small red blood cells on CBC.",
    answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia trait"],
    correct: 1,
    explanation: "This presentation fits iron deficiency anemia: microcytic anemia with chronic blood loss symptoms."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "67M has fatigue, numbness in his feet, gait instability, a smooth tongue, and enlarged red blood cells.",
    answers: ["Folate deficiency", "Vitamin B12 deficiency", "Hypothyroidism", "Reticulocytosis"],
    correct: 1,
    explanation: "This presentation fits vitamin B12 deficiency: macrocytic anemia with neurologic symptoms and glossitis."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "38F has fatigue, jaundice, dark urine, mild splenomegaly, and anemia after a recent viral illness.",
    answers: ["Iron deficiency anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolytic anemia"],
    correct: 3,
    explanation: "This presentation fits autoimmune hemolytic anemia: acute hemolysis after illness with jaundice, dark urine, and splenomegaly."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "4YO has recurrent episodes of severe bone pain, anemia, jaundice, and infections with encapsulated organisms.",
    answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"],
    correct: 2,
    explanation: "This presentation fits sickle cell disease: vaso-occlusive pain episodes, hemolysis, and functional asplenia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "64M has fatigue, frequent infections, easy bruising, and low red cells, white cells, and platelets.",
    answers: ["ITP", "TTP", "DIC", "Aplastic anemia"],
    correct: 3,
    explanation: "This presentation fits aplastic anemia: pancytopenia with infections, bruising, and fatigue."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "23F has fever, confusion, kidney injury, bruising, low platelets, and evidence of red cell fragmentation.",
    answers: ["ITP", "DIC", "TTP", "Hemophilia A"],
    correct: 2,
    explanation: "This presentation fits TTP: thrombocytopenia, neurologic changes, kidney injury, fever, and hemolysis."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "58M has fatigue, recurrent infections, gum bleeding, very high white count, anemia, and many immature cells on smear.",
    answers: ["Chronic myeloid leukemia", "Acute leukemia", "Leukemoid reaction", "Chronic lymphocytic leukemia"],
    correct: 1,
    explanation: "This presentation fits acute leukemia: infections, bleeding, anemia, and many immature cells."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "72M has back pain, fatigue, recurrent infections, kidney dysfunction, and elevated serum protein.",
    answers: ["Waldenström macroglobulinemia", "Multiple myeloma", "Hodgkin lymphoma", "CLL"],
    correct: 1,
    explanation: "This presentation fits multiple myeloma: bone pain, fatigue/anemia, renal dysfunction, recurrent infections, and high protein."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "46F taking warfarin has a very high INR discovered on routine testing, but she has no bleeding.",
    answers: ["Fresh frozen plasma", "Vitamin K and hold warfarin", "Platelet transfusion", "Protamine"],
    correct: 1,
    explanation: "This presentation fits supratherapeutic warfarin effect without bleeding: hold warfarin and give vitamin K when INR is very high."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Basic",
    vignette: "31M has painless neck lymph node enlargement, fevers, night sweats, weight loss, and itching.",
    answers: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Tuberculosis", "Reactive lymphadenopathy"],
    correct: 1,
    explanation: "This presentation fits Hodgkin lymphoma: young adult with painless lymphadenopathy and B symptoms."
  },

  // INFECTIOUS DISEASE — BASIC
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "47M with pneumonia becomes confused and hypotensive despite fluids. He is febrile, tachycardic, and has signs of poor perfusion.",
    answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"],
    correct: 0,
    explanation: "This presentation fits septic shock: infection with persistent hypotension and organ dysfunction."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "34M has fever, severe headache, neck stiffness, photophobia, confusion, and a rapidly worsening petechial rash.",
    answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"],
    correct: 1,
    explanation: "This presentation fits bacterial meningitis: acute fever, meningismus, confusion, and petechial rash."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "28M has fever, confusion, personality changes, focal seizures, and progressive neurologic decline over two days.",
    answers: ["Bacterial meningitis", "Viral meningitis", "Herpes encephalitis", "Fungal meningitis"],
    correct: 2,
    explanation: "This presentation fits herpes encephalitis: fever with encephalopathy, behavior change, and focal seizures."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "52M with a prosthetic valve has persistent fever, a new murmur, small painful finger nodules, and embolic skin findings.",
    answers: ["Infective endocarditis", "Pericarditis", "Myocarditis", "Pneumonia"],
    correct: 0,
    explanation: "This presentation fits infective endocarditis: fever, new murmur, prosthetic valve, and embolic findings."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "39F has watery diarrhea and crampy abdominal pain after eating undercooked poultry. She is stable and not immunocompromised.",
    answers: ["Immediate antibiotics", "Supportive care", "Urgent surgery", "Antitoxin"],
    correct: 1,
    explanation: "This presentation fits uncomplicated foodborne diarrhea: stable noninvasive illness after poultry exposure is usually managed supportively."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "5YO unvaccinated child has high fever, cough, runny nose, red eyes, and a spreading rash that began on the face.",
    answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"],
    correct: 1,
    explanation: "This presentation fits measles: unvaccinated child with fever, cough, coryza, conjunctivitis, and face-first spreading rash."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "31M has a painful genital ulcer and tender swollen inguinal lymph nodes after unprotected sex.",
    answers: ["Genital herpes", "Syphilis", "Chancroid", "Granuloma inguinale"],
    correct: 2,
    explanation: "This presentation fits chancroid: painful genital ulcer with tender lymphadenopathy."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "27F with advanced HIV has progressive dyspnea, dry cough, fever, low oxygen saturation, and diffuse bilateral hazy infiltrates.",
    answers: ["Bacterial pneumonia", "Tuberculosis", "Pneumocystis pneumonia", "CMV pneumonitis"],
    correct: 2,
    explanation: "This presentation fits Pneumocystis pneumonia: advanced HIV with dry cough, hypoxemia, and diffuse bilateral infiltrates."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "52M develops jaundice, fatigue, dark urine, and right upper quadrant discomfort several weeks after a needlestick injury.",
    answers: ["Chronic hepatitis B", "Acute hepatitis B", "Resolved hepatitis B", "Hepatitis B immunity"],
    correct: 1,
    explanation: "This presentation fits acute hepatitis B: new jaundice and hepatitis symptoms weeks after blood exposure."
  },
  {
    topic: "Infectious Disease",
    mode: "Basic",
    vignette: "48M returns from West Africa with recurrent fevers, shaking chills, sweats, jaundice, and anemia.",
    answers: ["Dengue", "Typhoid fever", "Malaria", "Leptospirosis"],
    correct: 2,
    explanation: "This presentation fits malaria: recurrent fever with chills, sweats, anemia, jaundice, and travel to an endemic region."
  },

  // NEUROLOGY — BASIC
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "67M suddenly develops right arm weakness, facial droop, and difficulty speaking while eating breakfast. Symptoms began 2 hours ago.",
    answers: ["TIA", "Hemorrhagic stroke", "Acute ischemic stroke", "Todd paralysis"],
    correct: 2,
    explanation: "This presentation fits acute ischemic stroke: sudden focal neurologic deficit within hours."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "54F has the worst headache of her life that began abruptly during exercise, with vomiting, neck stiffness, and photophobia.",
    answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Cluster headache"],
    correct: 2,
    explanation: "This presentation fits subarachnoid hemorrhage: abrupt thunderclap headache with meningismus."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "8YO has a generalized convulsion that continues for more than 5 minutes and does not stop spontaneously.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Syncope"],
    correct: 1,
    explanation: "This presentation fits status epilepticus: a seizure lasting more than 5 minutes."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "42F wakes up with one-sided facial weakness involving the mouth, eye closure, and forehead, without arm or leg symptoms.",
    answers: ["Stroke", "Bell palsy", "Trigeminal neuralgia", "Myasthenia gravis"],
    correct: 1,
    explanation: "This presentation fits Bell palsy: complete unilateral facial weakness including forehead without limb deficits."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "38M develops progressive leg weakness that ascends over days after diarrhea. Reflexes are absent, and breathing feels harder.",
    answers: ["Transverse myelitis", "Guillain-Barré syndrome", "ALS", "Spinal cord compression"],
    correct: 1,
    explanation: "This presentation fits Guillain-Barré syndrome: ascending weakness with areflexia after infection."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "55F has slowly progressive memory loss, difficulty managing finances, getting lost in familiar places, and impaired daily functioning.",
    answers: ["Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Alzheimer disease"],
    correct: 3,
    explanation: "This presentation fits Alzheimer disease: gradual memory-predominant decline that impairs daily function."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "31M has drooping eyelids and double vision that worsen by evening, plus weakness that improves after rest.",
    answers: ["Myasthenia gravis", "Lambert-Eaton syndrome", "Polymyositis", "Thyroid eye disease"],
    correct: 0,
    explanation: "This presentation fits myasthenia gravis: fatigable ocular and generalized weakness that improves with rest."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "58M has slowly worsening hand tremor at rest, small handwriting, stiffness, slow movements, and a shuffling gait.",
    answers: ["Essential tremor", "Parkinson disease", "Cerebellar ataxia", "Dystonia"],
    correct: 1,
    explanation: "This presentation fits Parkinson disease: rest tremor, bradykinesia, rigidity, and shuffling gait."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "24F has episodes of vision loss, limb numbness, and imbalance that occurred months apart and partially resolved each time.",
    answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"],
    correct: 2,
    explanation: "This presentation fits multiple sclerosis: neurologic episodes separated in time and involving different CNS areas."
  },
  {
    topic: "Neurology",
    mode: "Basic",
    vignette: "68M has recurrent episodes of spinning vertigo lasting hours, with ringing, ear fullness, and fluctuating hearing loss in one ear.",
    answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"],
    correct: 2,
    explanation: "This presentation fits Ménière disease: recurrent vertigo with unilateral hearing symptoms and ear fullness."
  },

  // PSYCHIATRY — BASIC
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "32F has 3 weeks of low mood, loss of interest, insomnia, guilt, poor concentration, low energy, and thoughts of death.",
    answers: ["Adjustment disorder", "Major depressive disorder", "Persistent depressive disorder", "Bipolar disorder"],
    correct: 1,
    explanation: "This presentation fits major depressive disorder: multiple depressive symptoms lasting more than 2 weeks with impairment."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "28M has one week of little sleep, pressured speech, grandiosity, risky spending, and irritability severe enough to require hospitalization.",
    answers: ["ADHD", "Mania", "Generalized anxiety disorder", "Hypomania"],
    correct: 1,
    explanation: "This presentation fits mania: elevated or irritable mood with decreased need for sleep, risky behavior, and hospitalization."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "45M has excessive worry about work, health, finances, and family on most days for many months, with muscle tension and poor sleep.",
    answers: ["Social anxiety disorder", "Generalized anxiety disorder", "Panic disorder", "Specific phobia"],
    correct: 1,
    explanation: "This presentation fits generalized anxiety disorder: chronic excessive worry across multiple domains with somatic tension."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "35F has recurrent sudden episodes of palpitations, sweating, shortness of breath, and fear of dying, followed by worry about future attacks.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "Panic disorder", "Social anxiety disorder"],
    correct: 2,
    explanation: "This presentation fits panic disorder: unexpected panic attacks followed by persistent worry about recurrence."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "52M veteran has nightmares, intrusive memories, avoidance of reminders, irritability, and hypervigilance months after combat trauma.",
    answers: ["Adjustment disorder", "PTSD", "Acute stress disorder", "Generalized anxiety disorder"],
    correct: 1,
    explanation: "This presentation fits PTSD: trauma exposure followed by intrusion, avoidance, and hyperarousal for more than 1 month."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "28F spends hours washing her hands because of intrusive contamination fears, even though she knows the behavior is excessive.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "OCD", "Body dysmorphic disorder"],
    correct: 2,
    explanation: "This presentation fits OCD: intrusive obsessions plus repetitive compulsions causing distress or impairment."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "24M has months of social withdrawal, disorganized speech, auditory hallucinations, fixed paranoid beliefs, and declining function.",
    answers: ["Brief psychotic disorder", "Schizophreniform disorder", "Schizophrenia", "Delusional disorder"],
    correct: 2,
    explanation: "This presentation fits schizophrenia: chronic psychosis with functional decline lasting at least 6 months."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "41F repeatedly eats large amounts in secret, feels loss of control, then vomits and exercises intensely. Her BMI is normal.",
    answers: ["Anorexia nervosa", "Bulimia nervosa", "Binge eating disorder", "Avoidant restrictive food intake disorder"],
    correct: 1,
    explanation: "This presentation fits bulimia nervosa: binge eating with compensatory behaviors and normal BMI."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "49M with heavy alcohol use stops drinking and develops tremor, sweating, anxiety, tachycardia, and hypertension the next morning.",
    answers: ["Wernicke encephalopathy", "Alcohol withdrawal", "Delirium tremens", "Hepatic encephalopathy"],
    correct: 1,
    explanation: "This presentation fits alcohol withdrawal: tremor and autonomic hyperactivity within hours after stopping alcohol."
  },
  {
    topic: "Psychiatry",
    mode: "Basic",
    vignette: "38M has a long pattern of grandiosity, entitlement, exploiting others, needing admiration, and dismissing other people’s feelings.",
    answers: ["Borderline personality disorder", "Narcissistic personality disorder", "Antisocial personality disorder", "Histrionic personality disorder"],
    correct: 1,
    explanation: "This presentation fits narcissistic personality disorder: grandiosity, need for admiration, entitlement, and lack of empathy."
  },

  // RHEUMATOLOGY — BASIC
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "52F has months of symmetric pain and swelling in her wrists and finger joints, with morning stiffness lasting more than an hour.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Systemic lupus erythematosus", "Gout"],
    correct: 1,
    explanation: "This presentation fits rheumatoid arthritis: symmetric inflammatory small-joint arthritis with prolonged morning stiffness."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "35F has photosensitive facial rash, oral ulcers, joint pain, fatigue, and intermittent pleuritic chest discomfort.",
    answers: ["Sjögren syndrome", "Systemic sclerosis", "Systemic lupus erythematosus", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "This presentation fits SLE: photosensitive rash, oral ulcers, arthritis, fatigue, and serositis symptoms."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "48M has sudden severe pain, redness, and swelling of one big toe after a weekend of alcohol and heavy meals.",
    answers: ["Rheumatoid arthritis", "Pseudogout", "Gout", "Septic arthritis"],
    correct: 2,
    explanation: "This presentation fits gout: acute intensely painful first-toe monoarthritis after alcohol and heavy meals."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "64F has sudden painful swelling of one knee. She has a history of osteoarthritis and recurrent similar knee attacks.",
    answers: ["Gout", "Pseudogout", "Rheumatoid arthritis", "Polymyalgia rheumatica"],
    correct: 1,
    explanation: "This presentation fits pseudogout: older patient with recurrent acute knee monoarthritis and osteoarthritis history."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "67M has new aching and stiffness in both shoulders and hips, worse in the morning, without true muscle weakness.",
    answers: ["Rheumatoid arthritis", "Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis"],
    correct: 1,
    explanation: "This presentation fits polymyalgia rheumatica: older patient with shoulder/hip girdle pain and morning stiffness without weakness."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "72F has new temporal headache, scalp tenderness while brushing hair, jaw pain while chewing, and transient vision loss.",
    answers: ["Polymyalgia rheumatica", "Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa"],
    correct: 1,
    explanation: "This presentation fits giant cell arteritis: older patient with temporal headache, scalp tenderness, jaw claudication, and visual symptoms."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "58M has progressive skin tightening of the fingers, Raynaud episodes, reflux, and difficulty swallowing solids.",
    answers: ["SLE", "Sjögren syndrome", "Systemic sclerosis", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "This presentation fits systemic sclerosis: skin tightening, Raynaud phenomenon, reflux, and dysphagia."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "41M has chronic low back pain that improves with exercise, morning stiffness, and reduced spinal flexibility.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Ankylosing spondylitis", "Gout"],
    correct: 2,
    explanation: "This presentation fits ankylosing spondylitis: inflammatory back pain with morning stiffness and reduced spinal mobility."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "44F has persistent dry eyes, dry mouth, dental caries, parotid swelling, and aching joints.",
    answers: ["SLE", "Rheumatoid arthritis", "Sjögren syndrome", "Systemic sclerosis"],
    correct: 2,
    explanation: "This presentation fits Sjögren syndrome: dry eyes, dry mouth, parotid swelling, dental issues, and arthralgias."
  },
  {
    topic: "Rheumatology",
    mode: "Basic",
    vignette: "52M has palpable purpura on the legs, hematuria, cough with blood-streaked sputum, and worsening kidney function.",
    answers: ["Polyarteritis nodosa", "Microscopic polyangiitis", "Granulomatosis with polyangiitis", "Takayasu arteritis"],
    correct: 1,
    explanation: "This presentation fits microscopic polyangiitis: small-vessel skin, kidney, and pulmonary involvement."
  },

  // OB/GYN — BASIC
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "26F with amenorrhea and positive pregnancy test has unilateral pelvic pain and light vaginal bleeding.",
    answers: ["Ectopic pregnancy", "Normal early pregnancy", "Endometriosis", "Pelvic inflammatory disease"],
    correct: 0,
    explanation: "This presentation fits ectopic pregnancy: early pregnancy with unilateral pelvic pain and vaginal bleeding."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "29F at 8 weeks gestation has vaginal bleeding, cramping, and an open cervical os on pelvic exam.",
    answers: ["Threatened abortion", "Inevitable abortion", "Complete abortion", "Missed abortion"],
    correct: 1,
    explanation: "This presentation fits inevitable abortion: early pregnancy bleeding with cramping and an open cervical os."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "31F at 9 weeks gestation has mild vaginal bleeding but no cramping. Pelvic exam shows a closed cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Septic abortion", "Complete abortion"],
    correct: 0,
    explanation: "This presentation fits threatened abortion: early pregnancy bleeding with a closed cervical os."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "34F at 34 weeks gestation has painless bright red vaginal bleeding. The uterus is soft and nontender.",
    answers: ["Placenta previa", "Placental abruption", "Uterine rupture", "Preterm labor"],
    correct: 0,
    explanation: "This presentation fits placenta previa: painless third-trimester bleeding with a soft, nontender uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "28F at 35 weeks gestation has painful vaginal bleeding, uterine tenderness, and frequent contractions.",
    answers: ["Placenta previa", "Placental abruption", "Cervicitis", "Vasa previa"],
    correct: 1,
    explanation: "This presentation fits placental abruption: painful bleeding with uterine tenderness and contractions."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "30F at 32 weeks gestation has BP 166/108 mmHg, headache, visual symptoms, and right upper quadrant pain.",
    answers: ["Gestational hypertension", "Preeclampsia with severe features", "Chronic hypertension", "HELLP syndrome only"],
    correct: 1,
    explanation: "This presentation fits preeclampsia with severe features: severe hypertension with neurologic symptoms and RUQ pain."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "27F at 38 weeks gestation has a generalized tonic-clonic seizure after days of headache and elevated blood pressure.",
    answers: ["Epilepsy", "Eclampsia", "Syncope", "Panic attack"],
    correct: 1,
    explanation: "This presentation fits eclampsia: seizure in a pregnant patient with preeclampsia symptoms."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "25F at 30 weeks gestation has contractions every 6 minutes and progressive cervical dilation.",
    answers: ["Braxton Hicks contractions", "Preterm labor", "Placenta previa", "Round ligament pain"],
    correct: 1,
    explanation: "This presentation fits preterm labor: regular contractions with cervical change before 37 weeks."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "32F at 41 weeks gestation reports decreased fetal movement. Nonstress test shows recurrent late decelerations.",
    answers: ["Reassuring fetal status", "Uteroplacental insufficiency", "Cord compression", "Fetal sleep cycle"],
    correct: 1,
    explanation: "This presentation fits uteroplacental insufficiency: late decelerations reflect impaired placental oxygen delivery."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "24F in labor has abrupt fetal heart rate decelerations that vary in timing and shape with contractions.",
    answers: ["Uteroplacental insufficiency", "Cord compression", "Normal fetal tracing", "Maternal fever"],
    correct: 1,
    explanation: "This presentation fits cord compression: variable decelerations vary in onset and shape."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "33F has heavy postpartum bleeding and a soft enlarged uterus shortly after vaginal delivery.",
    answers: ["Uterine atony", "Retained placenta", "Cervical laceration", "Uterine inversion"],
    correct: 0,
    explanation: "This presentation fits uterine atony: postpartum hemorrhage with a boggy enlarged uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "29F has fever, uterine tenderness, and foul-smelling lochia two days after prolonged labor and cesarean delivery.",
    answers: ["Endometritis", "Mastitis", "Urinary tract infection", "Wound dehiscence"],
    correct: 0,
    explanation: "This presentation fits postpartum endometritis: fever, uterine tenderness, and foul lochia after delivery."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "30F who is breastfeeding has fever and a painful red wedge-shaped area on one breast.",
    answers: ["Breast abscess", "Mastitis", "Inflammatory breast cancer", "Fibroadenoma"],
    correct: 1,
    explanation: "This presentation fits mastitis: lactating patient with fever and focal painful breast erythema."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "26F has lower abdominal pain, fever, cervical motion tenderness, and mucopurulent cervical discharge.",
    answers: ["Pelvic inflammatory disease", "Ectopic pregnancy", "Endometriosis", "Ovarian torsion"],
    correct: 0,
    explanation: "This presentation fits PID: pelvic pain, fever, cervical motion tenderness, and mucopurulent discharge."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "23F has sudden severe unilateral pelvic pain with nausea and vomiting. Pregnancy test is negative.",
    answers: ["Ovarian torsion", "Pelvic inflammatory disease", "Endometriosis", "Mittelschmerz"],
    correct: 0,
    explanation: "This presentation fits ovarian torsion: sudden unilateral pelvic pain with nausea and vomiting."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "35F has chronic cyclic pelvic pain, painful menses, deep dyspareunia, and infertility.",
    answers: ["Endometriosis", "Adenomyosis", "Pelvic inflammatory disease", "Ovarian torsion"],
    correct: 0,
    explanation: "This presentation fits endometriosis: cyclic pelvic pain, dysmenorrhea, dyspareunia, and infertility."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "43F has heavy painful menses, a uniformly enlarged tender uterus, and chronic pelvic pressure.",
    answers: ["Adenomyosis", "Endometriosis", "Leiomyomas", "Endometrial cancer"],
    correct: 0,
    explanation: "This presentation fits adenomyosis: heavy painful menses with a diffusely enlarged tender uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "39F has heavy menstrual bleeding and pelvic pressure. Exam shows an enlarged irregular uterus.",
    answers: ["Leiomyomas", "Adenomyosis", "Endometriosis", "Endometrial hyperplasia"],
    correct: 0,
    explanation: "This presentation fits leiomyomas: heavy bleeding and bulk symptoms with an irregular enlarged uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "58F has postmenopausal vaginal bleeding. She has obesity, hypertension, and long-standing diabetes.",
    answers: ["Endometrial cancer", "Cervical ectropion", "Normal menopause", "Functional ovarian cyst"],
    correct: 0,
    explanation: "This presentation fits endometrial cancer until proven otherwise: postmenopausal bleeding with unopposed estrogen risk factors."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "21F has malodorous thin gray vaginal discharge and vaginal pH greater than 4.5.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Physiologic discharge"],
    correct: 0,
    explanation: "This presentation fits bacterial vaginosis: thin malodorous gray discharge with elevated vaginal pH."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "25F has intense vulvar itching, thick white discharge, and normal vaginal pH.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Chlamydia cervicitis"],
    correct: 1,
    explanation: "This presentation fits vulvovaginal candidiasis: pruritus, thick white discharge, and normal pH."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "27F has frothy yellow-green discharge, vulvar irritation, and strawberry cervix.",
    answers: ["Trichomoniasis", "Bacterial vaginosis", "Candidiasis", "Atrophic vaginitis"],
    correct: 0,
    explanation: "This presentation fits trichomoniasis: frothy discharge, irritation, and strawberry cervix."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "24F has irregular menses, acne, hirsutism, weight gain, and difficulty becoming pregnant.",
    answers: ["PCOS", "Premature ovarian insufficiency", "Hyperprolactinemia", "Endometriosis"],
    correct: 0,
    explanation: "This presentation fits PCOS: oligo-ovulation with hyperandrogenic features and infertility."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "31F has galactorrhea, headaches, and amenorrhea despite a negative pregnancy test.",
    answers: ["Hyperprolactinemia", "PCOS", "Asherman syndrome", "Primary ovarian insufficiency"],
    correct: 0,
    explanation: "This presentation fits hyperprolactinemia: galactorrhea and amenorrhea with negative pregnancy testing."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "29F has secondary amenorrhea after dilation and curettage for postpartum hemorrhage.",
    answers: ["Asherman syndrome", "PCOS", "Pregnancy", "Endometriosis"],
    correct: 0,
    explanation: "This presentation fits Asherman syndrome: amenorrhea from intrauterine adhesions after uterine instrumentation."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "52F has hot flashes, sleep disturbance, vaginal dryness, and 12 months without menses.",
    answers: ["Menopause", "PCOS", "Pregnancy", "Endometrial cancer"],
    correct: 0,
    explanation: "This presentation fits menopause: vasomotor symptoms and 12 months of amenorrhea."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "17F has never had menses. She has normal breast development but cyclic pelvic pain and a bulging bluish hymen.",
    answers: ["Imperforate hymen", "Turner syndrome", "Müllerian agenesis", "PCOS"],
    correct: 0,
    explanation: "This presentation fits imperforate hymen: primary amenorrhea with normal puberty, cyclic pain, and obstructed outflow."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "16F has primary amenorrhea, short stature, webbed neck, broad chest, and no breast development.",
    answers: ["Turner syndrome", "Müllerian agenesis", "Imperforate hymen", "Constitutional delay"],
    correct: 0,
    explanation: "This presentation fits Turner syndrome: primary amenorrhea with short stature and absent pubertal development."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "25F wants highly effective long-term contraception and does not want to remember daily pills.",
    answers: ["Long-acting reversible contraception", "Withdrawal method", "Calendar method", "Spermicide alone"],
    correct: 0,
    explanation: "This presentation favors long-acting reversible contraception: highly effective contraception without daily adherence."
  },
  {
    topic: "OB/GYN",
    mode: "Basic",
    vignette: "36F with migraine with aura requests contraception. She smokes and wants to avoid pregnancy.",
    answers: ["Combined oral contraceptive", "Progestin-only method", "Estrogen patch", "Combined vaginal ring"],
    correct: 1,
    explanation: "This presentation favors a progestin-only method: estrogen-containing contraception is avoided with migraine with aura and smoking."
  },

  // PEDIATRICS — BASIC
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "6-week-old boy has projectile nonbilious vomiting after feeds, persistent hunger, weight loss, and a palpable olive-shaped epigastric mass.",
    answers: ["Pyloric stenosis", "Intussusception", "Malrotation with volvulus", "Gastroesophageal reflux"],
    correct: 0,
    explanation: "This presentation fits pyloric stenosis: young infant with projectile nonbilious vomiting, hunger after feeds, weight loss, and olive-shaped mass."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "8-month-old boy has intermittent episodes of severe crying, drawing knees to chest, vomiting, and currant jelly stools.",
    answers: ["Intussusception", "Pyloric stenosis", "Hirschsprung disease", "Viral gastroenteritis"],
    correct: 0,
    explanation: "This presentation fits intussusception: episodic abdominal pain, knee flexion, vomiting, and bloody mucus stools."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "2-day-old newborn has bilious vomiting and abdominal distension shortly after feeding.",
    answers: ["Malrotation with volvulus", "Pyloric stenosis", "Gastroesophageal reflux", "Milk protein allergy"],
    correct: 0,
    explanation: "This presentation fits malrotation with volvulus: bilious vomiting in a newborn is a surgical emergency."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "3-day-old newborn has not passed meconium, has abdominal distension, and has explosive stool after rectal exam.",
    answers: ["Hirschsprung disease", "Pyloric stenosis", "Intussusception", "Meconium ileus only"],
    correct: 0,
    explanation: "This presentation fits Hirschsprung disease: delayed meconium passage, distension, and explosive stool after rectal exam."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "2-year-old has barking cough, hoarseness, inspiratory stridor, and symptoms that worsen at night after a viral prodrome.",
    answers: ["Croup", "Epiglottitis", "Foreign body aspiration", "Bronchiolitis"],
    correct: 0,
    explanation: "This presentation fits croup: barking cough, hoarseness, nocturnal worsening, and inspiratory stridor after viral symptoms."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "8-month-old has cough, wheezing, tachypnea, and poor feeding during winter after several days of runny nose.",
    answers: ["Bronchiolitis", "Croup", "Asthma", "Epiglottitis"],
    correct: 0,
    explanation: "This presentation fits bronchiolitis: infant with viral URI followed by wheezing, tachypnea, and poor feeding."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "4-year-old suddenly develops high fever, drooling, muffled voice, tripod positioning, and severe respiratory distress.",
    answers: ["Epiglottitis", "Croup", "Bronchiolitis", "Viral pharyngitis"],
    correct: 0,
    explanation: "This presentation fits epiglottitis: toxic child with fever, drooling, muffled voice, tripod posture, and airway distress."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "2-year-old has sudden coughing and wheezing while playing with small toys. Breath sounds are decreased on one side.",
    answers: ["Foreign body aspiration", "Asthma", "Croup", "Bronchiolitis"],
    correct: 0,
    explanation: "This presentation fits foreign body aspiration: abrupt cough/wheeze during play with unilateral decreased breath sounds."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "5-year-old has 5 days of fever, conjunctivitis, cracked lips, swollen hands, rash, and cervical lymphadenopathy.",
    answers: ["Kawasaki disease", "Measles", "Scarlet fever", "Juvenile idiopathic arthritis"],
    correct: 0,
    explanation: "This presentation fits Kawasaki disease: prolonged fever with mucocutaneous inflammation, extremity changes, rash, and lymphadenopathy."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "7-year-old has fever, migratory joint pain, new murmur, and involuntary movements several weeks after untreated sore throat.",
    answers: ["Acute rheumatic fever", "Kawasaki disease", "Juvenile idiopathic arthritis", "Septic arthritis"],
    correct: 0,
    explanation: "This presentation fits acute rheumatic fever: migratory arthritis, carditis, and chorea after untreated streptococcal pharyngitis."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "3-year-old refuses to bear weight and has fever with a swollen painful hip held flexed and externally rotated.",
    answers: ["Septic arthritis", "Transient synovitis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease"],
    correct: 0,
    explanation: "This presentation fits septic arthritis: febrile child with severe joint pain and refusal to bear weight."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "7-year-old boy has painless limp, limited hip abduction, and chronic groin pain without fever.",
    answers: ["Legg-Calvé-Perthes disease", "Septic arthritis", "Slipped capital femoral epiphysis", "Transient synovitis"],
    correct: 0,
    explanation: "This presentation fits Legg-Calvé-Perthes disease: school-aged child with painless limp and limited hip motion."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "13-year-old overweight boy has hip pain referred to the knee and walks with an externally rotated leg.",
    answers: ["Slipped capital femoral epiphysis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease", "Septic arthritis"],
    correct: 0,
    explanation: "This presentation fits slipped capital femoral epiphysis: overweight adolescent with hip/knee pain and external rotation."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "15-year-old runner has anterior knee pain and tenderness over the tibial tubercle that worsens with activity.",
    answers: ["Osgood-Schlatter disease", "Septic arthritis", "Patellar dislocation", "Slipped capital femoral epiphysis"],
    correct: 0,
    explanation: "This presentation fits Osgood-Schlatter disease: adolescent athlete with activity-related tibial tubercle pain."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "2-year-old has multiple bruises in different stages of healing and a spiral fracture inconsistent with the caregiver’s story.",
    answers: ["Nonaccidental trauma", "Osteogenesis imperfecta", "Normal toddler injuries", "Vitamin D deficiency"],
    correct: 0,
    explanation: "This presentation fits nonaccidental trauma: injuries inconsistent with history and bruises in different stages of healing."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "18-month-old has fever and generalized tonic-clonic seizure lasting 3 minutes. He returns to baseline quickly.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Infantile spasms"],
    correct: 0,
    explanation: "This presentation fits simple febrile seizure: brief generalized seizure with fever and rapid return to baseline."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "6-month-old has clusters of brief flexion spasms after waking and developmental regression.",
    answers: ["Infantile spasms", "Absence seizures", "Simple febrile seizure", "Breath-holding spells"],
    correct: 0,
    explanation: "This presentation fits infantile spasms: clusters of brief spasms in infancy with developmental regression."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "8-year-old has frequent brief staring spells with eyelid fluttering and immediate return to activity.",
    answers: ["Absence seizures", "Focal impaired awareness seizures", "Syncope", "ADHD"],
    correct: 0,
    explanation: "This presentation fits absence seizures: brief staring episodes with immediate return to baseline."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "4-year-old has polyuria, polydipsia, weight loss, abdominal pain, vomiting, and deep rapid breathing.",
    answers: ["Diabetic ketoacidosis", "Type 2 diabetes", "Gastroenteritis", "Diabetes insipidus"],
    correct: 0,
    explanation: "This presentation fits DKA: child with hyperglycemic symptoms, weight loss, vomiting, and deep rapid breathing."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "10-year-old has polyuria, edema, hypertension, and cola-colored urine after a recent throat infection.",
    answers: ["Poststreptococcal glomerulonephritis", "Minimal change disease", "IgA nephropathy", "Nephrolithiasis"],
    correct: 0,
    explanation: "This presentation fits poststreptococcal glomerulonephritis: nephritic syndrome after recent throat infection."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "5-year-old has periorbital edema, leg swelling, heavy proteinuria, and normal blood pressure after a viral illness.",
    answers: ["Minimal change disease", "Poststreptococcal glomerulonephritis", "IgA nephropathy", "Henoch-Schönlein purpura"],
    correct: 0,
    explanation: "This presentation fits minimal change disease: nephrotic syndrome in a child after viral illness."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "6-year-old has palpable purpura on the legs, abdominal pain, joint pain, and hematuria.",
    answers: ["IgA vasculitis", "ITP", "Meningococcemia", "Kawasaki disease"],
    correct: 0,
    explanation: "This presentation fits IgA vasculitis: palpable purpura, abdominal pain, arthralgia, and renal involvement."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "3-week-old has jaundice, poor feeding, vomiting, hepatomegaly, and cataracts after starting milk feeds.",
    answers: ["Galactosemia", "Physiologic jaundice", "Breast milk jaundice", "Biliary atresia"],
    correct: 0,
    explanation: "This presentation fits galactosemia: jaundice, liver dysfunction, vomiting, poor feeding, and cataracts after milk exposure."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "6-week-old has persistent jaundice, pale stools, dark urine, and hepatomegaly.",
    answers: ["Biliary atresia", "Breast milk jaundice", "Physiologic jaundice", "Gilbert syndrome"],
    correct: 0,
    explanation: "This presentation fits biliary atresia: persistent conjugated jaundice with pale stools, dark urine, and hepatomegaly."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "2-year-old has developmental regression, loss of social engagement, repetitive hand movements, and poor eye contact.",
    answers: ["Autism spectrum disorder", "Normal development", "ADHD", "Oppositional defiant disorder"],
    correct: 0,
    explanation: "This presentation fits autism spectrum disorder: impaired social communication with restricted/repetitive behaviors."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "8-year-old is inattentive, impulsive, and disruptive at school and home for more than 6 months.",
    answers: ["ADHD", "Autism spectrum disorder", "Normal behavior", "Specific learning disorder"],
    correct: 0,
    explanation: "This presentation fits ADHD: persistent inattention/hyperactivity across multiple settings."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "Newborn has cyanosis that improves with crying but worsens during feeding.",
    answers: ["Choanal atresia", "Tetralogy of Fallot", "Transient tachypnea", "Laryngomalacia"],
    correct: 0,
    explanation: "This presentation fits choanal atresia: newborn cyanosis relieved by crying and worsened by feeding."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "Infant has recurrent cyanotic spells that improve with squatting and a harsh systolic murmur.",
    answers: ["Tetralogy of Fallot", "Ventricular septal defect", "Patent ductus arteriosus", "Atrial septal defect"],
    correct: 0,
    explanation: "This presentation fits tetralogy of Fallot: cyanotic spells relieved by squatting with a harsh systolic murmur."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "Premature infant has respiratory distress shortly after birth with grunting, nasal flaring, and diffuse atelectasis.",
    answers: ["Neonatal respiratory distress syndrome", "Transient tachypnea of newborn", "Meconium aspiration", "Choanal atresia"],
    correct: 0,
    explanation: "This presentation fits neonatal respiratory distress syndrome: premature infant with surfactant deficiency and early respiratory distress."
  },
  {
    topic: "Pediatrics",
    mode: "Basic",
    vignette: "Term newborn delivered by cesarean has tachypnea shortly after birth but mild symptoms that improve over 24 hours.",
    answers: ["Transient tachypnea of newborn", "Neonatal respiratory distress syndrome", "Meconium aspiration", "Pneumonia"],
    correct: 0,
    explanation: "This presentation fits transient tachypnea of the newborn: term cesarean infant with mild self-limited tachypnea."
  },

  // SURGERY / EMERGENCY — BASIC
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "22M has periumbilical pain that migrated to the right lower quadrant, anorexia, nausea, and focal tenderness at McBurney point.",
    answers: ["Appendicitis", "Gastroenteritis", "Diverticulitis", "Renal colic"],
    correct: 0,
    explanation: "This presentation fits appendicitis: migratory periumbilical-to-RLQ pain with anorexia, nausea, and focal RLQ tenderness."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "37F has persistent right upper quadrant pain after a fatty meal, fever, nausea, and inspiratory arrest during RUQ palpation.",
    answers: ["Acute cholecystitis", "Biliary colic", "Acute pancreatitis", "Appendicitis"],
    correct: 0,
    explanation: "This presentation fits acute cholecystitis: persistent RUQ pain with fever, nausea, and inspiratory tenderness."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "59M has severe epigastric pain radiating to the back with vomiting after heavy alcohol use.",
    answers: ["Acute pancreatitis", "Perforated ulcer", "GERD", "Bowel obstruction"],
    correct: 0,
    explanation: "This presentation fits acute pancreatitis: severe epigastric pain radiating to the back after alcohol use."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "62M has sudden severe abdominal pain, rigid abdomen, and free air under the diaphragm on upright chest x-ray.",
    answers: ["Perforated viscus", "Small bowel obstruction", "Appendicitis", "Diverticulitis"],
    correct: 0,
    explanation: "This presentation fits perforated viscus: sudden severe abdominal pain, peritonitis, and free intraperitoneal air."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "69F with prior abdominal surgeries has crampy abdominal pain, vomiting, distension, and obstipation.",
    answers: ["Small bowel obstruction", "Gastroenteritis", "Mesenteric ischemia", "Pancreatitis"],
    correct: 0,
    explanation: "This presentation fits small bowel obstruction: crampy pain, vomiting, distension, obstipation, and prior surgery."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "75M with atrial fibrillation has sudden severe abdominal pain out of proportion to exam and bloody diarrhea.",
    answers: ["Mesenteric ischemia", "Appendicitis", "Gastroenteritis", "Diverticulitis"],
    correct: 0,
    explanation: "This presentation fits mesenteric ischemia: sudden severe pain out of proportion, embolic risk, and bloody diarrhea."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "72M smoker has sudden tearing abdominal and back pain, hypotension, and a pulsatile abdominal mass.",
    answers: ["Ruptured abdominal aortic aneurysm", "Renal colic", "Pancreatitis", "Aortic stenosis"],
    correct: 0,
    explanation: "This presentation fits ruptured AAA: older smoker with abdominal/back pain, hypotension, and pulsatile mass."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "64M has sudden painful cold pale leg with absent pulses and numbness.",
    answers: ["Acute limb ischemia", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "This presentation fits acute limb ischemia: sudden pain, pallor, pulselessness, coldness, and neurologic symptoms."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "26M has severe testicular pain, nausea, high-riding testis, and absent cremasteric reflex.",
    answers: ["Testicular torsion", "Epididymitis", "Inguinal hernia", "Hydrocele"],
    correct: 0,
    explanation: "This presentation fits testicular torsion: sudden severe testicular pain with high-riding testis and absent cremasteric reflex."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "31M has colicky flank pain radiating to the groin with nausea and hematuria.",
    answers: ["Ureteral stone", "Pyelonephritis", "Appendicitis", "Testicular torsion"],
    correct: 0,
    explanation: "This presentation fits ureteral stone: colicky flank-to-groin pain with nausea and hematuria."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "28M after tibial fracture has escalating leg pain, pain with passive toe extension, tense compartments, and paresthesias.",
    answers: ["Compartment syndrome", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "This presentation fits compartment syndrome: severe pain, pain with passive stretch, tense compartments, and paresthesias after fracture."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "45M has rapidly spreading leg pain, fever, crepitus, skin discoloration, and pain far beyond exam findings.",
    answers: ["Necrotizing fasciitis", "Cellulitis", "Deep vein thrombosis", "Erysipelas"],
    correct: 0,
    explanation: "This presentation fits necrotizing fasciitis: severe pain out of proportion with systemic toxicity and rapidly progressive soft tissue infection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Burn patient has facial burns, singed nasal hairs, hoarseness, and soot in the mouth after house fire.",
    answers: ["Early endotracheal intubation", "Topical antibiotics only", "Outpatient follow-up", "Oral steroids"],
    correct: 0,
    explanation: "This presentation requires early intubation: facial burns, soot, hoarseness, and inhalation injury threaten the airway."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Trauma patient has hypotension, distended neck veins, muffled heart sounds, and clear lungs after a stab wound to the chest.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Hemothorax", "Pulmonary contusion"],
    correct: 0,
    explanation: "This presentation fits cardiac tamponade: obstructive shock with JVD, muffled heart sounds, and clear lungs after penetrating trauma."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Trauma patient has hypotension, absent breath sounds on one side, tracheal deviation, and severe respiratory distress.",
    answers: ["Tension pneumothorax", "Cardiac tamponade", "Flail chest", "Pulmonary embolism"],
    correct: 0,
    explanation: "This presentation fits tension pneumothorax: shock with unilateral absent breath sounds and tracheal deviation."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has paradoxical movement of a chest wall segment after blunt trauma and severe pain with breathing.",
    answers: ["Flail chest", "Tension pneumothorax", "Cardiac tamponade", "Rib contusion"],
    correct: 0,
    explanation: "This presentation fits flail chest: paradoxical chest wall motion from multiple rib fractures."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Postoperative patient on day 2 has fever, dyspnea, and low oxygen saturation after shallow breathing due to pain.",
    answers: ["Atelectasis", "Wound infection", "Pulmonary embolism", "Anastomotic leak"],
    correct: 0,
    explanation: "This presentation fits postoperative atelectasis: early postoperative fever and hypoxemia from shallow breathing."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Postoperative patient on day 5 has fever, erythema, warmth, and purulent drainage from the incision.",
    answers: ["Surgical site infection", "Atelectasis", "Deep vein thrombosis", "Urinary retention"],
    correct: 0,
    explanation: "This presentation fits surgical site infection: postoperative fever with erythema, warmth, and purulent wound drainage."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Elderly patient develops sudden painless bright red blood per rectum and has a soft nontender abdomen.",
    answers: ["Diverticular bleeding", "Ischemic colitis", "Anal fissure", "Peptic ulcer bleeding"],
    correct: 0,
    explanation: "This presentation fits diverticular bleeding: painless lower GI bleeding in an older adult with benign abdominal exam."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has severe anal pain during defecation with bright red blood on toilet paper.",
    answers: ["Anal fissure", "Internal hemorrhoids", "Diverticular bleeding", "Colorectal cancer"],
    correct: 0,
    explanation: "This presentation fits anal fissure: severe pain with defecation and small-volume bright red bleeding."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has painless bright red blood coating stool and palpable perianal swelling.",
    answers: ["Hemorrhoids", "Anal fissure", "Ischemic colitis", "Inflammatory bowel disease"],
    correct: 0,
    explanation: "This presentation fits hemorrhoids: painless bright red rectal bleeding and perianal swelling."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has vomiting, crampy abdominal pain, distension, and high-pitched bowel sounds after prior laparotomy.",
    answers: ["Mechanical bowel obstruction", "Ileus", "Gastroenteritis", "Cholecystitis"],
    correct: 0,
    explanation: "This presentation fits mechanical bowel obstruction: crampy pain, vomiting, distension, high-pitched bowel sounds, and prior surgery."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Postoperative patient has abdominal distension, nausea, and absent bowel sounds after opioid use.",
    answers: ["Ileus", "Mechanical bowel obstruction", "Mesenteric ischemia", "Appendicitis"],
    correct: 0,
    explanation: "This presentation fits ileus: postoperative bowel dysmotility with distension and absent bowel sounds, often worsened by opioids."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has fever, jaundice, right upper quadrant pain, confusion, and hypotension.",
    answers: ["Ascending cholangitis", "Acute cholecystitis", "Viral hepatitis", "Pancreatitis"],
    correct: 0,
    explanation: "This presentation fits severe ascending cholangitis: RUQ pain, fever, jaundice, hypotension, and confusion."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has painless jaundice, weight loss, dark urine, pale stools, and a palpable nontender gallbladder.",
    answers: ["Pancreatic cancer", "Acute hepatitis", "Choledocholithiasis", "Acute cholecystitis"],
    correct: 0,
    explanation: "This presentation fits pancreatic cancer: painless obstructive jaundice with weight loss and palpable nontender gallbladder."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has sudden severe tearing chest pain radiating to the back with unequal arm blood pressures.",
    answers: ["Aortic dissection", "Acute MI", "Pulmonary embolism", "Pericarditis"],
    correct: 0,
    explanation: "This presentation fits aortic dissection: sudden tearing chest/back pain with pulse or blood pressure asymmetry."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient with blunt abdominal trauma has left shoulder pain, hypotension, and abdominal tenderness.",
    answers: ["Splenic rupture", "Appendicitis", "Renal colic", "Pancreatitis"],
    correct: 0,
    explanation: "This presentation fits splenic rupture: blunt trauma with hypotension, abdominal tenderness, and referred left shoulder pain."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient after pelvic fracture has blood at the urethral meatus and inability to void.",
    answers: ["Urethral injury", "Bladder infection", "Renal stone", "Testicular torsion"],
    correct: 0,
    explanation: "This presentation fits urethral injury: pelvic fracture with blood at the meatus and urinary retention."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has lower abdominal pain, inability to urinate, and a distended tender bladder.",
    answers: ["Acute urinary retention", "Pyelonephritis", "Renal infarction", "Ureteral stone"],
    correct: 0,
    explanation: "This presentation fits acute urinary retention: suprapubic pain, inability to void, and distended bladder."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Basic",
    vignette: "Patient has deep neck infection with fever, drooling, muffled voice, and trismus.",
    answers: ["Deep neck space infection", "Viral pharyngitis", "GERD", "Allergic rhinitis"],
    correct: 0,
    explanation: "This presentation fits deep neck space infection: fever with drooling, muffled voice, trismus, and airway risk."
  },

  // QUALITY / PATIENT SAFETY — BASIC
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospitalized patient receives the wrong medication because two patients with similar names are in adjacent rooms.",
    answers: ["Use two patient identifiers", "Ask the patient’s room number", "Rely on the medication label", "Move one patient after the error"],
    correct: 0,
    explanation: "This presentation fits patient identification failure: using two identifiers prevents wrong-patient medication errors."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient deteriorates overnight after the day team verbally mentioned a pending potassium result but did not document it in the handoff.",
    answers: ["Standardized handoff tool", "Longer resident shifts", "Verbal reminders only", "More frequent paging"],
    correct: 0,
    explanation: "This presentation fits handoff failure: standardized handoff tools reduce omitted critical information."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A surgical team nearly operates on the wrong side because the consent and schedule list different laterality.",
    answers: ["Preoperative time-out", "Postoperative debriefing", "Incident report only", "Faster room turnover"],
    correct: 0,
    explanation: "This presentation fits wrong-site surgery risk: preoperative time-out confirms patient, procedure, and laterality."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "Several patients develop central-line bloodstream infections in the ICU over one month.",
    answers: ["Central-line insertion checklist", "Longer antibiotic courses", "Daily blood cultures for everyone", "More frequent room cleaning only"],
    correct: 0,
    explanation: "This presentation fits preventable line infection: checklist-based sterile insertion reduces central-line bloodstream infections."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient develops ventilator-associated pneumonia after prolonged intubation and inconsistent head-of-bed elevation.",
    answers: ["Ventilator care bundle", "Routine broad antibiotics", "Daily chest CT", "Delay extubation"],
    correct: 0,
    explanation: "This presentation fits ventilator-associated infection prevention: ventilator bundles reduce VAP risk."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A nurse notices that a medication dose seems ten times higher than usual but the prescriber insists it is correct.",
    answers: ["Escalate using chain of command", "Administer as ordered", "Wait until next shift", "Ask the family to decide"],
    correct: 0,
    explanation: "This presentation fits safety escalation: serious unresolved medication concerns should be escalated through the chain of command."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient falls while walking to the bathroom at night after receiving sedating medication.",
    answers: ["Fall risk assessment and prevention plan", "Bed rest for all patients", "Physical restraints", "Nocturnal fluid restriction"],
    correct: 0,
    explanation: "This presentation fits inpatient fall risk: targeted fall precautions reduce falls in high-risk patients."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A diabetic patient is discharged without clear instructions and returns with severe hypoglycemia after taking insulin incorrectly.",
    answers: ["Teach-back before discharge", "Longer discharge paperwork", "Avoid insulin prescriptions", "Only verbal instructions"],
    correct: 0,
    explanation: "This presentation fits discharge education failure: teach-back confirms patient understanding."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient is readmitted because the outpatient physician never received the hospital discharge summary.",
    answers: ["Improve care transitions", "Change inpatient antibiotic", "Increase length of stay", "Avoid outpatient follow-up"],
    correct: 0,
    explanation: "This presentation fits transition-of-care failure: timely discharge communication reduces readmission risk."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient’s home medication is unintentionally omitted during admission, causing worsening heart failure.",
    answers: ["Medication reconciliation", "Daily weights only", "Pharmacy billing review", "Patient satisfaction survey"],
    correct: 0,
    explanation: "This presentation fits medication reconciliation failure: comparing home and hospital medications prevents omissions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A clinic wants to test a small workflow change before applying it across the whole hospital.",
    answers: ["Plan-Do-Study-Act cycle", "Root cause analysis", "Case-control study", "Randomized trial only"],
    correct: 0,
    explanation: "This presentation fits PDSA: small rapid tests of change are used in quality improvement."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital reviews a fatal medication error to identify system factors that allowed it to occur.",
    answers: ["Root cause analysis", "PDSA cycle", "Cost-effectiveness analysis", "Patient satisfaction survey"],
    correct: 0,
    explanation: "This presentation fits root cause analysis: serious adverse events are analyzed to identify system causes."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A trainee makes a medication error and the patient is harmed.",
    answers: ["Disclose the error to the patient", "Hide the error if harm is minor", "Tell only the hospital lawyer", "Wait for the patient to ask"],
    correct: 0,
    explanation: "This presentation fits error disclosure: harmful medical errors should be disclosed honestly to the patient."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A wrong dose is almost administered but is caught by the nurse before reaching the patient.",
    answers: ["Report as a near miss", "Ignore because no harm occurred", "Punish the nurse", "Delete the order silently"],
    correct: 0,
    explanation: "This presentation fits a near miss: events caught before harm should be reported to improve systems."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital wants to reduce catheter-associated urinary tract infections.",
    answers: ["Remove unnecessary urinary catheters", "Routine antibiotics for all catheterized patients", "Daily urine cultures", "Use larger catheters"],
    correct: 0,
    explanation: "This presentation fits CAUTI prevention: avoiding and removing unnecessary catheters reduces infection."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient develops pressure ulcers after prolonged immobility and inconsistent repositioning.",
    answers: ["Scheduled turning and pressure offloading", "Routine antibiotics", "Strict bed rest", "Daily blood cultures"],
    correct: 0,
    explanation: "This presentation fits pressure injury prevention: repositioning and pressure offloading reduce ulcers."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient receives opioid pain medication and is later found oversedated with respiratory depression.",
    answers: ["Sedation monitoring after opioids", "Avoid pain assessment", "Use opioids without reassessment", "Discharge immediately"],
    correct: 0,
    explanation: "This presentation fits opioid safety failure: sedation and respiratory status should be monitored after opioids."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital wants to track how often patients receive antibiotics within 1 hour before incision.",
    answers: ["Process measure", "Outcome measure", "Balancing measure", "Root cause"],
    correct: 0,
    explanation: "This presentation fits a process measure: it tracks whether a desired care step occurred."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital tracks postoperative infection rates after implementing a surgical checklist.",
    answers: ["Outcome measure", "Process measure", "Balancing measure", "Structural measure"],
    correct: 0,
    explanation: "This presentation fits an outcome measure: infection rate reflects the result of care."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A new discharge program reduces readmissions but increases clinic phone call volume dramatically.",
    answers: ["Balancing measure", "Outcome measure", "Process measure", "Sentinel event"],
    correct: 0,
    explanation: "This presentation fits a balancing measure: it detects unintended consequences of an intervention."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A nurse is afraid to report near misses because prior reports led to blame and punishment.",
    answers: ["Just culture", "Individual blame culture", "More secrecy", "Fewer incident reports"],
    correct: 0,
    explanation: "This presentation fits need for just culture: safety improves when reporting is encouraged without inappropriate blame."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient develops an allergic reaction after receiving a drug despite allergy information being present in another part of the chart.",
    answers: ["Improve allergy documentation and alerts", "Remove allergy lists", "Rely on patient wristband only", "Avoid all medications"],
    correct: 0,
    explanation: "This presentation fits information fragmentation: clear allergy documentation and alerts reduce preventable reactions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient with limited English proficiency signs consent after a family member informally translates.",
    answers: ["Use a professional medical interpreter", "Proceed because family translated", "Use gestures only", "Delay all care indefinitely"],
    correct: 0,
    explanation: "This presentation fits communication risk: professional interpreters improve informed communication and safety."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A confused hospitalized patient pulls out IV lines and tries to climb out of bed repeatedly.",
    answers: ["Evaluate reversible causes and use least restrictive safety measures", "Immediately apply permanent restraints", "Ignore behavior", "Sedate without assessment"],
    correct: 0,
    explanation: "This presentation fits delirium safety management: assess causes and use least restrictive measures."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A clinician prescribes a nephrotoxic medication without checking kidney function, causing acute kidney injury.",
    answers: ["Clinical decision support for renal dosing", "More handwritten orders", "Avoid all medications", "Delay labs until discharge"],
    correct: 0,
    explanation: "This presentation fits medication safety failure: renal dosing support helps prevent kidney-related adverse drug events."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient with sepsis waits several hours for antibiotics because no one recognized worsening vital signs.",
    answers: ["Early warning system", "Longer progress notes", "Fewer vital sign checks", "Delayed triage"],
    correct: 0,
    explanation: "This presentation fits failure to rescue: early warning systems help identify deterioration."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital wants to reduce handoff omissions during transfer from ICU to ward.",
    answers: ["Structured transfer checklist", "Unstructured phone call only", "Shorter transfer note", "Delay all transfers"],
    correct: 0,
    explanation: "This presentation fits transfer communication risk: structured checklists reduce omitted information."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A patient receives duplicate anticoagulation because both inpatient and outpatient orders remain active.",
    answers: ["Medication reconciliation", "More frequent INR checks only", "Avoid anticoagulants permanently", "Ask the patient to choose"],
    correct: 0,
    explanation: "This presentation fits medication reconciliation failure: duplicate therapies are prevented by reconciling active medication lists."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A hospital compares infection rates between units and gives feedback to each unit monthly.",
    answers: ["Audit and feedback", "Root cause analysis only", "Case report", "Blame meeting"],
    correct: 0,
    explanation: "This presentation fits audit and feedback: performance data are shared to drive improvement."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Basic",
    vignette: "A resident is interrupted repeatedly while entering medication orders and accidentally selects the wrong dose.",
    answers: ["Reduce interruptions during order entry", "Add more pop-up alerts", "Punish the resident", "Eliminate electronic orders"],
    correct: 0,
    explanation: "This presentation fits human factors risk: reducing interruptions during high-risk tasks prevents errors."
  },
  // =========================================================
  // DECIPHER MODE
  // =========================================================

  // CARDIOLOGY — DECIPHER
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "70M says he is “just slowing down with age.” His resting BP is 132/76 mmHg and oxygen saturation is 98%. He now avoids stairs because of chest pressure and shortness of breath, and he fainted once while walking uphill. Exam shows a harsh systolic murmur radiating to the carotids.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral regurgitation", "Pulmonary embolism"],
    correct: 0,
    explanation: "Signal: exertional dyspnea, angina, syncope, and carotid-radiating systolic murmur. Noise: normal resting oxygenation and attributing symptoms to aging do not explain the exertional triad. This fits aortic stenosis."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "23M has dizziness during basketball and thinks he may be dehydrated because symptoms improve after sitting. Resting ECG was previously called “normal.” His father died suddenly at 34. Exam shows a systolic murmur that becomes louder with standing and softer with squatting.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral valve prolapse", "Dilated cardiomyopathy"],
    correct: 1,
    explanation: "Signal: exertional presyncope, family history of sudden death, and murmur louder with decreased preload. Noise: dehydration and a previously normal ECG do not override the dynamic murmur pattern. This fits hypertrophic cardiomyopathy."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "61M with prior MI has worsening dyspnea. He denies fever and his chest x-ray was initially read as “possible bronchitis.” He now sleeps in a recliner, has bilateral leg swelling, bibasilar crackles, and an S3 gallop.",
    answers: ["Acute decompensated heart failure", "COPD exacerbation", "Pneumonia", "Pulmonary embolism"],
    correct: 0,
    explanation: "Signal: orthopnea, edema, crackles, S3, and prior MI. Noise: absence of fever and a vague bronchitis read do not explain the volume-overload pattern. This fits acute decompensated heart failure."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "64F with known exertional chest discomfort now has pressure while resting after dinner. She says it might be reflux. Initial troponin is negative, but ECG shows new ST depressions.",
    answers: ["Stable angina", "Acute coronary syndrome", "Pericarditis", "Aortic dissection"],
    correct: 1,
    explanation: "Signal: rest chest pain with new ischemic ECG changes. Noise: post-meal timing and initially negative troponin do not exclude ACS. This fits acute coronary syndrome."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "52M has crushing chest pain, nausea, and diaphoresis. He also had mild indigestion earlier in the day. ECG shows ST elevation in II, III, and aVF. BP is 92/58 mmHg, lungs are clear, and JVP is elevated.",
    answers: ["Anterior MI", "Inferior MI with possible right ventricular involvement", "Lateral MI", "Posterior MI only"],
    correct: 1,
    explanation: "Signal: ST elevation in II, III, aVF indicates inferior MI; hypotension with clear lungs and elevated JVP suggests RV involvement. Noise: indigestion-like symptoms are a common misleading presentation of MI."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "46M has abrupt severe chest pain radiating to the back after lifting boxes. ECG shows nonspecific changes and troponin is pending. BP is 196/110 mmHg in the right arm and 162/92 mmHg in the left arm.",
    answers: ["Acute MI", "Aortic dissection", "Pulmonary embolism", "Pericarditis"],
    correct: 1,
    explanation: "Signal: abrupt back-radiating chest pain with inter-arm BP difference. Noise: exertion, nonspecific ECG changes, and pending troponin can distract toward MI, but the vascular findings fit aortic dissection."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "35F has sharp chest pain after a viral illness. She is anxious because her father had an MI. Pain worsens when lying flat and improves when leaning forward. ECG shows diffuse ST elevation and PR depression.",
    answers: ["Pericarditis", "Acute MI", "Pulmonary embolism", "GERD"],
    correct: 0,
    explanation: "Signal: positional pleuritic pain after viral illness with diffuse ST elevation and PR depression. Noise: family history of MI and anxiety are not the key pattern. This fits acute pericarditis."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "74M with atrial fibrillation has rapid palpitations. A nurse asks whether to give his usual oral beta-blocker. He is confused, BP is 78/46 mmHg, and he has new pulmonary edema.",
    answers: ["Oral anticoagulation", "IV beta-blocker only", "Immediate synchronized cardioversion", "Outpatient follow-up"],
    correct: 2,
    explanation: "Signal: atrial fibrillation with hypotension, altered mental status, and pulmonary edema. Noise: usual rate-control medication is tempting but unsafe in unstable AF. He needs synchronized cardioversion."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "48M has a stab wound to the chest. Breath sounds are equal, so the team initially worries less about the thorax. BP is 82/50 mmHg, neck veins are distended, and heart sounds are muffled.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Acute MI", "Massive pulmonary embolism"],
    correct: 0,
    explanation: "Signal: penetrating trauma with hypotension, JVD, and muffled heart sounds. Noise: equal breath sounds make tension pneumothorax less likely but do not rule out tamponade. This fits cardiac tamponade."
  },
  {
    topic: "Cardiology",
    mode: "Decipher",
    vignette: "60F has sudden dyspnea and pleuritic chest pain after a long flight. She has no fever and chest x-ray is normal. HR is 116/min and oxygen saturation is 90% on room air.",
    answers: ["Acute coronary syndrome", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correct: 1,
    explanation: "Signal: acute pleuritic dyspnea, tachycardia, hypoxemia, and recent immobility. Noise: normal chest x-ray and no fever do not exclude PE. This fits pulmonary embolism."
  },

  // PULMONOLOGY — DECIPHER
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "43M has sudden pleuritic chest pain after a fall. He is anxious but speaking full sentences. BP is 124/76 mmHg, trachea is midline, and one side has decreased breath sounds with hyperresonance.",
    answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"],
    correct: 2,
    explanation: "Signal: unilateral pleuritic pain, decreased breath sounds, and hyperresonance. Noise: anxiety and trauma can suggest something dramatic, but stable BP and midline trachea favor simple pneumothorax."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "29F has dry cough, dyspnea, and fatigue. She works in a school where someone recently had TB, but she has tender red nodules on her shins and chest imaging shows bilateral hilar lymphadenopathy.",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Goodpasture syndrome"],
    correct: 0,
    explanation: "Signal: erythema nodosum with bilateral hilar lymphadenopathy and pulmonary symptoms. Noise: possible TB exposure is distracting, but the classic systemic pattern fits sarcoidosis."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "55M has chronic cough, night sweats, weight loss, and intermittent hemoptysis. He was treated twice for “pneumonia,” but symptoms never resolved. Imaging shows an upper-lobe cavitary lesion.",
    answers: ["Sarcoidosis", "Community-acquired pneumonia", "Tuberculosis", "Pulmonary edema"],
    correct: 2,
    explanation: "Signal: chronic constitutional symptoms, hemoptysis, and upper-lobe cavitation. Noise: prior pneumonia treatment can distract, but nonresolution and cavitation fit active tuberculosis."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "63M with ischemic cardiomyopathy wakes up short of breath. He denies chest pain and has no fever. He coughs pink frothy sputum, has diffuse crackles, and has worse symptoms when lying flat.",
    answers: ["COPD exacerbation", "Cardiogenic pulmonary edema", "Pneumonia", "Spontaneous pneumothorax"],
    correct: 1,
    explanation: "Signal: orthopnea/paroxysmal nocturnal dyspnea, diffuse crackles, pink frothy sputum, and cardiac history. Noise: absence of chest pain or fever does not exclude pulmonary edema."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "27F has cough and chest tightness that wake her at night. Her lung exam is normal in clinic today, and oxygen saturation is 99%. Symptoms worsen around cats and improve after albuterol.",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Pulmonary embolism"],
    correct: 0,
    explanation: "Signal: episodic nighttime symptoms, allergen trigger, and bronchodilator response. Noise: normal exam and oxygen saturation between episodes do not exclude asthma."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "33M with a leg cast has sudden dyspnea and pleuritic chest pain. Chest x-ray is normal, temperature is 37.1°C, and he has no cough. HR is 122/min and oxygen saturation is 89%.",
    answers: ["Pneumonia", "Acute coronary syndrome", "Pulmonary embolism", "Pericarditis"],
    correct: 2,
    explanation: "Signal: immobilization, acute pleuritic dyspnea, tachycardia, and hypoxemia. Noise: normal chest x-ray, no fever, and no cough do not exclude PE."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "45F keeps several birds at home. She is told her symptoms may be anxiety because they come and go. She develops cough, dyspnea, and fatigue that worsen after cleaning cages; imaging shows diffuse interstitial changes.",
    answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"],
    correct: 2,
    explanation: "Signal: recurrent respiratory symptoms linked to bird antigen exposure with interstitial findings. Noise: episodic symptoms and anxiety attribution can distract. This fits hypersensitivity pneumonitis."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "20M hospitalized with sepsis receives IV fluids and later develops severe hypoxemia with bilateral infiltrates. Echocardiogram is normal, BNP is not elevated, and there is no peripheral edema.",
    answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Cardiogenic pulmonary edema"],
    correct: 1,
    explanation: "Signal: inflammatory trigger, severe hypoxemia, bilateral infiltrates, and noncardiogenic evaluation. Noise: recent fluids can suggest overload, but normal cardiac markers/exam favor ARDS."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "57F with a 40-pack-year smoking history has chronic cough and weight loss. She says her allergies have been worse this season. Imaging shows an irregular spiculated upper-lobe nodule.",
    answers: ["Benign granuloma", "Viral infection", "Lung cancer", "Pulmonary abscess"],
    correct: 2,
    explanation: "Signal: smoking history, weight loss, chronic cough, and spiculated upper-lobe nodule. Noise: seasonal allergy symptoms do not explain the suspicious nodule."
  },
  {
    topic: "Pulmonology",
    mode: "Decipher",
    vignette: "68M with COPD has increased dyspnea, wheezing, and sputum production over 2 days. Chest x-ray shows no focal infiltrate, and he has no chest pain. Oxygen saturation is slightly below his baseline.",
    answers: ["COPD exacerbation", "Pulmonary embolism", "Acute heart failure", "Pneumothorax"],
    correct: 0,
    explanation: "Signal: known COPD with acute increase in dyspnea, wheeze, and sputum. Noise: no focal infiltrate and no chest pain help move away from pneumonia/ACS, while mild hypoxemia can occur in COPD exacerbation."
  },  // NEPHROLOGY — DECIPHER
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "49M in the ICU after septic shock has rising creatinine. He received several IV contrast studies, but urine microscopy shows muddy brown granular casts and urine output is decreasing despite adequate fluids.",
    answers: ["Diabetic nephropathy", "Poststreptococcal glomerulonephritis", "Acute tubular necrosis", "Lupus nephritis"],
    correct: 2,
    explanation: "Signal: septic/ischemic kidney insult with AKI and muddy brown casts. Noise: IV contrast may contribute, but the sediment pattern still points to acute tubular necrosis."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "24M notices cola-colored urine 2 days after sore throat. He is worried because his friend had post-strep kidney disease. Complement levels are normal, and urinalysis shows red blood cell casts.",
    answers: ["IgA nephropathy", "Poststreptococcal glomerulonephritis", "Membranoproliferative glomerulonephritis", "Minimal change disease"],
    correct: 0,
    explanation: "Signal: hematuria within days of URI with normal complement. Noise: recent sore throat can distract toward PSGN, but PSGN usually occurs weeks later and often has low complement. This fits IgA nephropathy."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "53M with 20 years of poorly controlled diabetes has leg swelling and frothy urine. He denies flank pain and has no hematuria. Kidney function has slowly declined over years.",
    answers: ["Minimal change disease", "FSGS", "Diabetic nephropathy", "Membranous nephropathy"],
    correct: 2,
    explanation: "Signal: long diabetes duration, gradual CKD, and heavy proteinuria. Noise: absence of hematuria or flank pain does not change the nephrotic diabetic pattern. This fits diabetic nephropathy."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "42M with renal failure has weakness and palpitations. He says he missed dialysis but otherwise feels okay. Potassium is 7.0 mEq/L and ECG shows peaked T waves with QRS widening.",
    answers: ["IV calcium gluconate", "Loop diuretic only", "Oral potassium binder only", "Fluid restriction"],
    correct: 0,
    explanation: "Signal: severe hyperkalemia with ECG changes. Noise: the patient seeming relatively well does not matter; ECG toxicity requires immediate IV calcium."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "30F has recurrent flank pain and hematuria. She had one prior UTI, but ultrasound shows enlarged kidneys with numerous bilateral cysts. Her father required dialysis in his 50s.",
    answers: ["Pyelonephritis", "Autosomal dominant polycystic kidney disease", "Renal infarction", "Renal cell carcinoma"],
    correct: 1,
    explanation: "Signal: bilateral enlarged cystic kidneys plus family history of kidney failure. Noise: prior UTI does not explain inherited bilateral cystic disease. This fits ADPKD."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "59M with small cell lung cancer has confusion and sodium of 121 mEq/L. He has no edema, no vomiting, and no orthostatic symptoms. Urine osmolality and urine sodium are both elevated.",
    answers: ["Hypovolemic hyponatremia", "SIADH", "Diabetes insipidus", "Primary polydipsia"],
    correct: 1,
    explanation: "Signal: euvolemic hyponatremia with inappropriately concentrated urine and malignancy association. Noise: confusion is nonspecific; the volume status and urine studies point to SIADH."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "68F with decades of hypertension has slowly rising creatinine. She worries about lupus because her niece has it, but she has mild proteinuria, bland urine sediment, and no rash or joint swelling.",
    answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"],
    correct: 1,
    explanation: "Signal: long-standing hypertension, gradual CKD, mild proteinuria, and bland sediment. Noise: family concern about lupus is not supported by systemic or active urine findings. This fits hypertensive nephrosclerosis."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "40M has fever, nausea, urinary frequency, and left flank pain. He also has mild lower abdominal discomfort. Exam shows left CVA tenderness.",
    answers: ["Cystitis", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"],
    correct: 2,
    explanation: "Signal: fever, urinary symptoms, nausea, flank pain, and CVA tenderness. Noise: lower abdominal discomfort can occur with urinary infection, but systemic illness plus CVA tenderness favors pyelonephritis."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "45F has generalized edema and frothy urine. BP is normal and she has no dysuria or flank pain. Urinalysis shows 4+ protein without red blood cell casts.",
    answers: ["Nephritic syndrome", "Nephrotic syndrome", "Acute tubular necrosis", "Postrenal obstruction"],
    correct: 1,
    explanation: "Signal: edema and heavy proteinuria without inflammatory sediment. Noise: normal BP and lack of urinary pain do not exclude nephrotic syndrome."
  },
  {
    topic: "Nephrology",
    mode: "Decipher",
    vignette: "52M has sudden severe flank pain radiating to the groin. He is afebrile and cannot get comfortable. Urinalysis shows microscopic hematuria but no significant pyuria.",
    answers: ["Pyelonephritis", "Ureteral stone", "Renal cell carcinoma", "Glomerulonephritis"],
    correct: 1,
    explanation: "Signal: colicky flank-to-groin pain, pacing/restlessness, and hematuria. Noise: nausea and severe pain are nonspecific, but afebrile hematuric colic fits ureteral stone."
  },

  // GASTROENTEROLOGY/HEPATOLOGY — DECIPHER
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "49F has burning chest discomfort after meals and sour taste in her mouth. She worries it is cardiac because her father had an MI, but symptoms worsen when lying down and improve with antacids.",
    answers: ["Peptic ulcer disease", "GERD", "Gastric cancer", "Acute pancreatitis"],
    correct: 1,
    explanation: "Signal: postprandial burning, regurgitation, worse supine, and antacid response. Noise: family history of MI is not the defining pattern. This fits GERD."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "63M with cirrhosis and ascites vomits a large amount of blood. He drank alcohol last night and retched once before bleeding, but he is hypotensive and has spider angiomas.",
    answers: ["Peptic ulcer bleeding", "Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia"],
    correct: 1,
    explanation: "Signal: cirrhosis/portal hypertension with massive hematemesis and shock. Noise: retching can suggest Mallory-Weiss tear, but the cirrhosis and severity point to variceal bleeding."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "35F has RUQ pain after a fatty meal. Similar episodes previously resolved in an hour, but this one has lasted 12 hours with fever and inspiratory arrest during RUQ palpation.",
    answers: ["Biliary colic", "Acute cholecystitis", "Acute pancreatitis", "Viral hepatitis"],
    correct: 1,
    explanation: "Signal: persistent RUQ pain, fever, and Murphy sign. Noise: prior brief postprandial episodes suggest biliary colic history, but prolonged inflammatory symptoms fit acute cholecystitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "59M has severe epigastric pain radiating to his back after heavy alcohol use. ECG is nondiagnostic and he has repeated vomiting with partial relief when leaning forward.",
    answers: ["GERD", "Acute pancreatitis", "Acute MI", "Peptic ulcer disease"],
    correct: 1,
    explanation: "Signal: severe epigastric back-radiating pain after alcohol with vomiting and relief leaning forward. Noise: nondiagnostic ECG is included because epigastric pain can mimic MI, but this fits pancreatitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "43M has chronic diarrhea, bloating, fatigue, and iron deficiency anemia. He was told it might be IBS, but symptoms improve when he avoids bread and pasta.",
    answers: ["Crohn disease", "Celiac disease", "IBS", "Lactose intolerance"],
    correct: 1,
    explanation: "Signal: malabsorptive diarrhea, iron deficiency, and gluten association. Noise: IBS label is misleading because iron deficiency is an alarm/malabsorption clue. This fits celiac disease."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "30F develops watery diarrhea and cramping after finishing clindamycin. She recently ate takeout, but symptoms began after antibiotics and WBC count is elevated.",
    answers: ["Viral gastroenteritis", "C difficile infection", "Salmonella gastroenteritis", "Crohn disease"],
    correct: 1,
    explanation: "Signal: recent antibiotic exposure, watery diarrhea, cramping, and leukocytosis. Noise: takeout exposure is plausible but less important than antibiotic-associated C difficile."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "52M with chronic hepatitis C has abdominal distension, jaundice, easy bruising, leg edema, and spider angiomas. He denies abdominal pain and fever.",
    answers: ["Acute hepatitis", "Decompensated cirrhosis", "Acute cholangitis", "Pancreatic cancer"],
    correct: 1,
    explanation: "Signal: chronic liver disease with ascites, jaundice, coagulopathy signs, edema, and spider angiomas. Noise: no fever/RUQ pain makes cholangitis less likely. This fits decompensated cirrhosis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "38M has steady LLQ pain and fever. He recently had constipation and thinks he strained a muscle, but CT shows localized inflammation around the sigmoid colon.",
    answers: ["Appendicitis", "Diverticulitis", "Ulcerative colitis", "Ischemic colitis"],
    correct: 1,
    explanation: "Signal: LLQ pain, fever, and sigmoid inflammation on CT. Noise: constipation/muscle strain history does not override the colonic inflammatory pattern. This fits diverticulitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "56F has years of abdominal discomfort with alternating constipation and diarrhea. Pain improves after bowel movements. She has no anemia, fever, blood in stool, or weight loss.",
    answers: ["Crohn disease", "Ulcerative colitis", "Irritable bowel syndrome", "Celiac disease"],
    correct: 2,
    explanation: "Signal: chronic bowel-pattern-related pain without alarm features. Noise: alternating bowel habits can sound concerning, but absence of inflammatory/alarm signs supports IBS."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Decipher",
    vignette: "47M has progressive difficulty swallowing. He first noticed problems with steak and bread, then later with liquids. He also has reflux symptoms, but he has lost 15 lb unintentionally.",
    answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"],
    correct: 2,
    explanation: "Signal: progressive solids-to-liquids dysphagia with weight loss. Noise: reflux symptoms can coexist, but progressive dysphagia and weight loss are cancer red flags."
  },

  // ENDOCRINOLOGY — DECIPHER
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "19M has weeks of thirst, urination, and weight loss, followed by vomiting and abdominal pain. He is afebrile, but he is dehydrated with deep rapid breathing and very high glucose.",
    answers: ["Type 2 diabetes", "Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Hypoglycemia"],
    correct: 1,
    explanation: "Signal: young patient with hyperglycemic symptoms, vomiting, dehydration, and Kussmaul respirations. Noise: no fever does not exclude DKA; infection is only one trigger."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "70F with type 2 diabetes is confused and profoundly dehydrated. She has no abdominal pain and minimal ketones, but glucose is 940 mg/dL with high serum osmolality.",
    answers: ["Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Lactic acidosis", "Hypoglycemia"],
    correct: 1,
    explanation: "Signal: older type 2 diabetic with extreme hyperglycemia, hyperosmolality, dehydration, and minimal ketosis. Noise: lack of abdominal pain/ketones helps separate HHS from DKA."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "58M has weight loss despite increased appetite, tremor, heat intolerance, and palpitations. He says he is under stress at work, but exam shows a diffusely enlarged thyroid.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroid cancer", "Central hypothyroidism"],
    correct: 1,
    explanation: "Signal: weight loss with increased appetite, tremor, heat intolerance, palpitations, and goiter. Noise: stress can cause palpitations but does not explain the full thyrotoxic pattern."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "43F has fatigue, constipation, dry skin, and weight gain. She attributes it to a busy schedule. HR is 54/min and she feels cold when others are comfortable.",
    answers: ["Hyperthyroidism", "Hypothyroidism", "Adrenal insufficiency", "Cushing syndrome"],
    correct: 1,
    explanation: "Signal: cold intolerance, constipation, dry skin, weight gain, bradycardia, and fatigue. Noise: busy schedule is a common attribution but does not explain hypothyroid features."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "52M has resistant hypertension despite three medications. He denies licorice use and takes no diuretics. Potassium is 2.9 mEq/L and bicarbonate is elevated.",
    answers: ["Primary hyperaldosteronism", "Pheochromocytoma", "Addison disease", "SIADH"],
    correct: 0,
    explanation: "Signal: resistant hypertension with hypokalemia and metabolic alkalosis without diuretics. Noise: medication history is there to exclude common alternative causes. This fits primary hyperaldosteronism."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "39F has central weight gain, easy bruising, facial rounding, proximal weakness, and new hypertension. She says she has been exercising less, but she also has wide purple abdominal striae.",
    answers: ["Adrenal insufficiency", "Cushing syndrome", "Hypothyroidism", "PCOS"],
    correct: 1,
    explanation: "Signal: central obesity, bruising, moon facies, proximal weakness, hypertension, and purple striae. Noise: reduced exercise may contribute to weight gain but does not explain catabolic skin/muscle findings."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "26F has menses every 2-3 months, acne, coarse facial hair, and difficulty conceiving. Pregnancy test is negative and TSH is normal.",
    answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"],
    correct: 1,
    explanation: "Signal: oligomenorrhea, hyperandrogenism, infertility, and exclusion of pregnancy/thyroid disease. Noise: normal TSH helps remove a common mimic. This fits PCOS."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "68M has recurrent kidney stones, constipation, fatigue, and bone pain. He takes a multivitamin, but calcium remains elevated and parathyroid hormone is high.",
    answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide effect"],
    correct: 2,
    explanation: "Signal: hypercalcemia symptoms with elevated PTH. Noise: multivitamin use is unlikely to explain persistent PTH-mediated hypercalcemia. This fits primary hyperparathyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "53F after menopause has a distal radius fracture after a fall from standing height. She says it was just clumsiness, but bone density testing shows reduced bone mass.",
    answers: ["Normal aging", "Osteopenia", "Osteoporosis", "Osteomalacia"],
    correct: 2,
    explanation: "Signal: postmenopausal low-trauma fracture with reduced bone density. Noise: dismissing the fall as clumsiness does not erase fragility fracture significance. This fits osteoporosis."
  },
  {
    topic: "Endocrinology",
    mode: "Decipher",
    vignette: "42M has recurrent early-morning episodes of sweating, tremor, confusion, and blurred vision that resolve after juice. He is not diabetic and takes no glucose-lowering drugs.",
    answers: ["Factitious insulin use", "Insulinoma", "Panic disorder", "Adrenal insufficiency"],
    correct: 1,
    explanation: "Signal: fasting hypoglycemic symptoms relieved by carbohydrate in a nondiabetic patient. Noise: panic-like symptoms can overlap, but fasting pattern and relief with glucose fit insulinoma."
  },

  // HEMATOLOGY/ONCOLOGY — DECIPHER
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "53F has fatigue and dyspnea on exertion. She recently started a vegetarian diet, but she also has heavy menstrual bleeding, microcytosis, and low ferritin.",
    answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia trait"],
    correct: 1,
    explanation: "Signal: microcytic anemia with low ferritin and chronic blood loss. Noise: vegetarian diet can distract, but heavy menstrual bleeding plus low ferritin points to iron deficiency."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "68M has fatigue, numb feet, gait instability, and glossitis. He drinks alcohol socially, but CBC shows macrocytosis and exam shows decreased vibration sense.",
    answers: ["Folate deficiency", "Vitamin B12 deficiency", "Hypothyroidism", "Reticulocytosis"],
    correct: 1,
    explanation: "Signal: macrocytosis with neurologic deficits and glossitis. Noise: alcohol can cause macrocytosis, but neurologic findings point to vitamin B12 deficiency."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "39F develops fatigue, jaundice, dark urine, and mild splenomegaly after a viral illness. She denies heavy menstrual bleeding. Labs show elevated indirect bilirubin and reticulocytosis.",
    answers: ["Iron deficiency anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolytic anemia"],
    correct: 3,
    explanation: "Signal: hemolytic anemia with jaundice, dark urine, splenomegaly, and reticulocytosis. Noise: anemia could be misattributed to bleeding, but the hemolysis pattern fits autoimmune hemolytic anemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "4-year-old has recurrent severe bone pain episodes, anemia, jaundice, and repeated infections with encapsulated bacteria. Parents ask if this is just growing pains.",
    answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"],
    correct: 2,
    explanation: "Signal: vaso-occlusive pain, hemolysis, and functional asplenia. Noise: growing pains do not cause anemia, jaundice, and encapsulated infections. This fits sickle cell disease."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "65M has fatigue, bruising, and recurrent infections. He recently had a viral illness, but CBC shows low hemoglobin, low white blood cells, and low platelets.",
    answers: ["ITP", "TTP", "DIC", "Aplastic anemia"],
    correct: 3,
    explanation: "Signal: pancytopenia causing fatigue, infections, and bruising. Noise: recent viral illness can be incidental or trigger marrow problems, but isolated platelet disorders do not explain all three low cell lines."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "24F has fever, confusion, bruising, kidney injury, low platelets, and schistocytes. Coagulation studies are near normal.",
    answers: ["ITP", "DIC", "TTP", "Hemophilia A"],
    correct: 2,
    explanation: "Signal: thrombocytopenia, MAHA, neurologic findings, fever, and renal injury. Noise: bruising can suggest ITP, but schistocytes plus neuro/renal findings fit TTP."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "59M has fatigue, gum bleeding, and recurrent infections. He was treated for gingivitis, but CBC shows anemia, thrombocytopenia, and many immature white cells.",
    answers: ["Chronic myeloid leukemia", "Acute leukemia", "Leukemoid reaction", "Chronic lymphocytic leukemia"],
    correct: 1,
    explanation: "Signal: marrow failure symptoms with blasts/immature cells. Noise: gum bleeding may be misattributed to dental disease, but cytopenias and immature cells fit acute leukemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "73M has back pain, fatigue, recurrent infections, renal dysfunction, and high total protein. He thought the back pain was arthritis, but imaging shows lytic bone lesions.",
    answers: ["Waldenström macroglobulinemia", "Multiple myeloma", "Hodgkin lymphoma", "CLL"],
    correct: 1,
    explanation: "Signal: CRAB features, recurrent infections, high protein, and lytic lesions. Noise: arthritis attribution is common in older adults but does not explain the systemic pattern. This fits multiple myeloma."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "47F on warfarin has INR 9.2 on routine testing. She has a small bruise from bumping her arm but no active bleeding, normal mental status, and stable vital signs.",
    answers: ["Fresh frozen plasma", "Vitamin K and hold warfarin", "Platelet transfusion", "Protamine"],
    correct: 1,
    explanation: "Signal: very high INR without major bleeding. Noise: a small bruise is not life-threatening bleeding. Management is holding warfarin and giving vitamin K."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Decipher",
    vignette: "32M has painless cervical lymphadenopathy, fevers, drenching night sweats, weight loss, and itching. He had a sore throat 3 weeks ago, but the node has enlarged.",
    answers: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Tuberculosis", "Reactive lymphadenopathy"],
    correct: 1,
    explanation: "Signal: painless lymphadenopathy with B symptoms and pruritus. Noise: recent sore throat could suggest reactive node, but progressive enlargement with B symptoms fits Hodgkin lymphoma."
  },

  // INFECTIOUS DISEASE — DECIPHER
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "48M with pneumonia has worsening confusion and hypotension despite fluids. His family says he was anxious earlier, but lactate is elevated and urine output is falling.",
    answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"],
    correct: 0,
    explanation: "Signal: infection with persistent hypotension, altered mental status, elevated lactate, and poor perfusion. Noise: anxiety does not explain shock physiology. This fits septic shock."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "35M has fever, severe headache, neck stiffness, photophobia, and confusion. He also has a viral URI exposure at home, but a petechial rash is spreading rapidly.",
    answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"],
    correct: 1,
    explanation: "Signal: acute meningismus with confusion and petechial rash. Noise: viral exposure is distracting, but severe illness and petechiae fit bacterial meningitis."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "29M has fever, confusion, personality change, and focal seizures over 2 days. His friend says he has been under stress, but MRI shows temporal lobe involvement.",
    answers: ["Bacterial meningitis", "Viral meningitis", "Herpes encephalitis", "Fungal meningitis"],
    correct: 2,
    explanation: "Signal: encephalopathy, behavior change, focal seizures, and temporal lobe involvement. Noise: stress does not explain focal febrile encephalitis. This fits HSV encephalitis."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "53M with a prosthetic valve has persistent fever, new murmur, painful finger nodules, and embolic skin lesions. He recently had a dental cleaning.",
    answers: ["Infective endocarditis", "Pericarditis", "Myocarditis", "Pneumonia"],
    correct: 0,
    explanation: "Signal: prosthetic valve, persistent fever, new murmur, and embolic/immunologic findings. Noise: dental cleaning is context, but the diagnosis is driven by the endocarditis pattern."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "40F develops watery diarrhea after eating undercooked poultry. She is afebrile, stable, not immunocompromised, and has no blood in stool.",
    answers: ["Immediate antibiotics", "Supportive care", "Urgent surgery", "Antitoxin"],
    correct: 1,
    explanation: "Signal: stable, nonbloody foodborne diarrhea without immunocompromise. Noise: poultry exposure identifies a possible organism but does not automatically require antibiotics."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "5-year-old unvaccinated child has high fever, cough, coryza, conjunctivitis, and a rash that starts on the face. His sibling recently had a mild viral rash.",
    answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"],
    correct: 1,
    explanation: "Signal: unvaccinated child with cough, coryza, conjunctivitis, high fever, and cephalocaudal rash. Noise: sibling viral rash is nonspecific. This fits measles."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "31M has a painful genital ulcer with ragged borders and tender inguinal lymphadenopathy. He is worried about syphilis because his partner was recently tested.",
    answers: ["Genital herpes", "Syphilis", "Chancroid", "Granuloma inguinale"],
    correct: 2,
    explanation: "Signal: painful ulcer with tender lymph nodes and ragged borders. Noise: syphilis concern is plausible, but syphilis classically causes a painless chancre. This fits chancroid."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "28F with advanced HIV has progressive dyspnea, dry cough, fever, hypoxemia, and diffuse bilateral hazy infiltrates. She has no focal lobar consolidation.",
    answers: ["Bacterial pneumonia", "Tuberculosis", "Pneumocystis pneumonia", "CMV pneumonitis"],
    correct: 2,
    explanation: "Signal: advanced HIV with dry cough, hypoxemia, and diffuse bilateral infiltrates. Noise: lack of lobar consolidation moves away from typical bacterial pneumonia. This fits Pneumocystis pneumonia."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "52M develops jaundice, dark urine, fatigue, and RUQ discomfort 8 weeks after a needlestick injury. He had mild nausea from travel last week but now has clear hepatitis symptoms.",
    answers: ["Chronic hepatitis B", "Acute hepatitis B", "Resolved hepatitis B", "Hepatitis B immunity"],
    correct: 1,
    explanation: "Signal: new hepatitis syndrome weeks after blood exposure. Noise: travel nausea is nonspecific; timing after needlestick points to acute hepatitis B."
  },
  {
    topic: "Infectious Disease",
    mode: "Decipher",
    vignette: "49M returns from West Africa with recurrent fevers, shaking chills, sweats, jaundice, and anemia. He took some antipyretics, which briefly lowered the fever.",
    answers: ["Dengue", "Typhoid fever", "Malaria", "Leptospirosis"],
    correct: 2,
    explanation: "Signal: recurrent fevers/chills, hemolysis/anemia, jaundice, and endemic travel. Noise: antipyretic response does not identify the disease. This fits malaria."
  },

  // NEUROLOGY — DECIPHER
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "68M suddenly develops right facial droop, right arm weakness, and aphasia 2 hours ago. His glucose is normal. He had a headache earlier, but symptoms are persistent and focal.",
    answers: ["TIA", "Hemorrhagic stroke", "Acute ischemic stroke", "Todd paralysis"],
    correct: 2,
    explanation: "Signal: sudden persistent focal neurologic deficit within the treatment window with normal glucose. Noise: headache is nonspecific; persistent focal deficit fits acute ischemic stroke."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "55F has abrupt worst headache of life during exercise with vomiting and neck stiffness. She has a history of migraines, but this headache reached maximal intensity immediately.",
    answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Cluster headache"],
    correct: 2,
    explanation: "Signal: thunderclap onset with meningismus and vomiting. Noise: migraine history should not reassure when the headache is sudden and maximal at onset. This fits subarachnoid hemorrhage."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "8-year-old has a generalized convulsion that continues for 7 minutes. He has had brief febrile seizures before, but this episode does not stop spontaneously.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Syncope"],
    correct: 1,
    explanation: "Signal: seizure lasting more than 5 minutes. Noise: prior brief febrile seizures do not change that this prolonged event is status epilepticus."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "43F wakes with unilateral facial weakness involving eye closure, forehead wrinkling, and mouth movement. She is afraid of stroke, but arm and leg strength are normal.",
    answers: ["Stroke", "Bell palsy", "Trigeminal neuralgia", "Myasthenia gravis"],
    correct: 1,
    explanation: "Signal: complete unilateral facial weakness including forehead without limb deficits. Noise: stroke concern is common, but forehead involvement favors peripheral facial nerve palsy."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "39M develops ascending leg weakness several days after diarrhea. He has mild back pain, but reflexes are absent and he says breathing feels harder.",
    answers: ["Transverse myelitis", "Guillain-Barré syndrome", "ALS", "Spinal cord compression"],
    correct: 1,
    explanation: "Signal: postinfectious ascending weakness, areflexia, and respiratory concern. Noise: mild back pain can distract, but the areflexic ascending pattern fits Guillain-Barré syndrome."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "56F has gradually worsening memory, difficulty managing finances, and getting lost near home. She occasionally misplaces keys, but now her daily function is impaired and attention is normal.",
    answers: ["Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Alzheimer disease"],
    correct: 3,
    explanation: "Signal: gradual memory-predominant decline with functional impairment and preserved attention. Noise: normal forgetfulness can include misplacing keys, but impaired function makes this dementia."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "32M has drooping eyelids and double vision that worsen by evening. He works long computer hours, but weakness improves after rest and worsens with repeated use.",
    answers: ["Myasthenia gravis", "Lambert-Eaton syndrome", "Polymyositis", "Thyroid eye disease"],
    correct: 0,
    explanation: "Signal: fatigable ocular and generalized weakness. Noise: computer strain can cause eye discomfort, but variable ptosis/diplopia with fatigability fits myasthenia gravis."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "59M has hand tremor. He says it is worse when nervous, but exam shows resting tremor, rigidity, small handwriting, slow movements, and shuffling gait.",
    answers: ["Essential tremor", "Parkinson disease", "Cerebellar ataxia", "Dystonia"],
    correct: 1,
    explanation: "Signal: rest tremor, bradykinesia, rigidity, micrographia, and shuffling gait. Noise: tremor worsened by nervousness can distract toward essential tremor, but the parkinsonian cluster is decisive."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "25F has episodes of vision loss, limb numbness, and imbalance months apart, each partially resolving. She has anxiety about symptoms, but MRI shows lesions in different CNS regions.",
    answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"],
    correct: 2,
    explanation: "Signal: neurologic deficits separated in time and space with multifocal CNS lesions. Noise: anxiety may coexist but does not explain objective recurrent neurologic deficits."
  },
  {
    topic: "Neurology",
    mode: "Decipher",
    vignette: "69M has recurrent spinning vertigo lasting hours with tinnitus, ear fullness, and fluctuating hearing loss in one ear. He tried motion sickness pills with only partial relief.",
    answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"],
    correct: 2,
    explanation: "Signal: episodic vertigo lasting hours with unilateral auditory symptoms. Noise: partial medication relief is nonspecific. This fits Ménière disease."
  },

  // PSYCHIATRY — DECIPHER
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "34F lost her job 5 weeks ago and says she is “just stressed.” She has stopped seeing friends, wakes at 4 AM daily, feels excessive guilt, cannot concentrate, and has missed several interviews.",
    answers: ["Major depressive disorder", "Adjustment disorder", "Normal stress response", "Persistent depressive disorder"],
    correct: 0,
    explanation: "Signal: social withdrawal, early-morning awakening, guilt, poor concentration, and functional impairment for more than 2 weeks. Noise: a clear stressor does not exclude MDD."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "29M says he is finally “reaching his true potential.” For 6 days he has slept 2 hours nightly, talks rapidly, interrupts constantly, and spent his rent money launching a business overnight.",
    answers: ["Mania", "Hypomania", "ADHD", "Normal excitement"],
    correct: 0,
    explanation: "Signal: decreased need for sleep, grandiosity, pressured behavior, and harmful risky spending. Noise: goal-directed energy can sound positive, but impairment makes this mania."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "46M frequently asks for reassurance about bills, his children’s safety, his health, and work mistakes. His family says this has been present for years and affects sleep, concentration, and muscle tension.",
    answers: ["Generalized anxiety disorder", "Panic disorder", "OCD", "Social anxiety disorder"],
    correct: 0,
    explanation: "Signal: excessive worry across multiple domains with sleep, concentration, and muscle tension symptoms. Noise: reassurance-seeking can resemble OCD, but there are no intrusive obsessions/rituals."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "37F has sudden episodes of chest tightness, trembling, and fear of dying. Her ECG during an ED visit was normal, but she now avoids grocery stores because she fears another attack.",
    answers: ["Panic disorder", "Generalized anxiety disorder", "Specific phobia", "Acute coronary syndrome"],
    correct: 0,
    explanation: "Signal: recurrent panic attacks followed by persistent avoidance. Noise: chest symptoms can mimic cardiac disease, but normal evaluation and anticipatory avoidance fit panic disorder."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "54M was assaulted 4 months ago. He says he is “fine,” but avoids the neighborhood, startles when doors slam, has nightmares, and feels detached from his family.",
    answers: ["PTSD", "Acute stress disorder", "Adjustment disorder", "Generalized anxiety disorder"],
    correct: 0,
    explanation: "Signal: trauma-related nightmares, avoidance, hyperarousal, and detachment lasting months. Noise: minimizing symptoms does not exclude PTSD."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "30F is late to work because she checks the stove and door locks for over an hour each morning. She knows this is irrational but says the anxiety is unbearable unless she repeats the checking.",
    answers: ["OCD", "Generalized anxiety disorder", "Paranoid personality disorder", "Psychosis"],
    correct: 0,
    explanation: "Signal: intrusive fear relieved by repetitive checking with preserved insight and impairment. Noise: fear of danger can sound paranoid, but insight and rituals fit OCD."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "23M’s grades have declined over 8 months. His roommate says he talks to unseen people, rarely showers, and believes classmates placed cameras in his room. Urine toxicology is negative.",
    answers: ["Schizophrenia", "Brief psychotic disorder", "Substance-induced psychosis", "Delusional disorder"],
    correct: 0,
    explanation: "Signal: hallucinations, delusions, negative symptoms, and functional decline for more than 6 months. Noise: negative toxicology helps exclude substance-induced psychosis. This fits schizophrenia."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "40F says she is “just dieting,” but describes repeated loss-of-control eating followed by vomiting and laxative use. Her BMI is 23 kg/m², potassium is 3.1 mEq/L, and dental enamel is worn.",
    answers: ["Bulimia nervosa", "Anorexia nervosa", "Binge eating disorder", "Avoidant restrictive food intake disorder"],
    correct: 0,
    explanation: "Signal: binge eating with compensatory purging, normal BMI, hypokalemia, and dental enamel erosion. Noise: calling it dieting does not change the syndrome."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "51M with heavy alcohol use is admitted after his last drink 10 hours ago. He says he is just nervous in the hospital, but he has tremor, sweating, tachycardia, and hypertension.",
    answers: ["Alcohol withdrawal", "Wernicke encephalopathy", "Hepatic encephalopathy", "Panic disorder"],
    correct: 0,
    explanation: "Signal: tremor and autonomic hyperactivity within hours after alcohol cessation. Noise: anxiety attribution is common, but vitals matter here because withdrawal produces autonomic instability."
  },
  {
    topic: "Psychiatry",
    mode: "Decipher",
    vignette: "39M’s coworkers say he exaggerates achievements, becomes angry when not praised, uses others to advance himself, and shows little concern when his actions harm the team. He has no hallucinations or mood episodes.",
    answers: ["Narcissistic personality disorder", "Borderline personality disorder", "Schizophrenia", "Avoidant personality disorder"],
    correct: 0,
    explanation: "Signal: grandiosity, need for admiration, exploitation, and lack of empathy. Noise: workplace conflict alone is nonspecific; the enduring interpersonal pattern fits narcissistic personality disorder."
  },

  // RHEUMATOLOGY — DECIPHER
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "50F has 4 months of hand pain and stiffness. She works with her hands and assumes it is overuse, but her wrists and MCP joints are swollen bilaterally and morning stiffness lasts 90 minutes.",
    answers: ["Rheumatoid arthritis", "Osteoarthritis", "Gout", "Fibromyalgia"],
    correct: 0,
    explanation: "Signal: prolonged morning stiffness with symmetric wrist/MCP swelling. Noise: hand overuse is plausible, but inflammatory symmetric small-joint arthritis fits rheumatoid arthritis."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "33F reports fatigue, joint pain, mouth sores, and rash after sun exposure. She recently changed sunscreen, but she also had sharp pleuritic chest pain last month.",
    answers: ["Systemic lupus erythematosus", "Rheumatoid arthritis", "Sjögren syndrome", "Dermatomyositis"],
    correct: 0,
    explanation: "Signal: photosensitive rash, oral ulcers, arthralgia, fatigue, and serositis symptoms. Noise: sunscreen change is a distractor; the multisystem autoimmune pattern fits SLE."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "49M wakes with sudden severe pain in the first toe. He had steak and several beers the night before. He is worried about infection, but the attack is abrupt and centered at the first MTP joint.",
    answers: ["Gout", "Pseudogout", "Septic arthritis", "Cellulitis"],
    correct: 0,
    explanation: "Signal: abrupt severe first-toe monoarthritis after alcohol/purine load. Noise: infection concern is common, but classic podagra pattern fits gout."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "68F has sudden swelling of one knee. She has osteoarthritis and two similar prior attacks. She denies trauma and has no rash or small-joint symptoms.",
    answers: ["Pseudogout", "Rheumatoid arthritis", "Polymyalgia rheumatica", "Reactive arthritis"],
    correct: 0,
    explanation: "Signal: older patient with recurrent acute knee monoarthritis and osteoarthritis history. Noise: lack of trauma and absence of RA-like pattern support pseudogout."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "70M says his shoulders and hips feel stiff for hours each morning. His family worries he is becoming weak, but strength is normal when pain is controlled.",
    answers: ["Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis", "Fibromyalgia"],
    correct: 0,
    explanation: "Signal: older patient with shoulder/hip girdle pain and morning stiffness but preserved true strength. Noise: perceived weakness from pain can mimic myopathy; normal strength favors PMR."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "74F has a new headache and scalp pain when combing her hair. She has had migraines in the past, but now she also has jaw fatigue while eating and transient blurred vision.",
    answers: ["Giant cell arteritis", "Migraine", "Trigeminal neuralgia", "Cluster headache"],
    correct: 0,
    explanation: "Signal: older patient with new headache, scalp tenderness, jaw claudication, and visual symptoms. Noise: migraine history should not distract from GCA red flags."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "57F has fingers that turn white in the cold. She says her reflux is from spicy food, but she also has tight shiny skin over the fingers and food sticking in the lower chest.",
    answers: ["Systemic sclerosis", "Sjögren syndrome", "SLE", "Rheumatoid arthritis"],
    correct: 0,
    explanation: "Signal: Raynaud phenomenon, sclerodactyly, reflux, and esophageal dysmotility. Noise: spicy food may worsen reflux, but systemic skin and vascular findings point to systemic sclerosis."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "36M has low back pain for 8 months. He bought a new mattress, but pain is worse after rest, improves with activity, and he has reduced forward bending.",
    answers: ["Ankylosing spondylitis", "Lumbar strain", "Osteoarthritis", "Spinal stenosis"],
    correct: 0,
    explanation: "Signal: chronic inflammatory back pain worse with rest and improved with activity plus reduced spinal mobility. Noise: mattress/mechanical attribution is misleading. This fits ankylosing spondylitis."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "46F carries water everywhere because her mouth feels dry. She also uses artificial tears and has new dental caries. She denies diabetes symptoms.",
    answers: ["Sjögren syndrome", "Systemic sclerosis", "SLE", "Diabetes mellitus"],
    correct: 0,
    explanation: "Signal: dry eyes, dry mouth, dental caries, and parotid-type sicca complaints. Noise: diabetes can cause thirst, but ocular/oral dryness with dental caries fits Sjögren syndrome."
  },
  {
    topic: "Rheumatology",
    mode: "Decipher",
    vignette: "53M has leg purpura, dark urine, and cough with blood-streaked sputum. He recently had bronchitis, but creatinine has doubled and urinalysis shows blood and protein.",
    answers: ["Microscopic polyangiitis", "Polyarteritis nodosa", "IgA vasculitis", "Cryoglobulinemia"],
    correct: 0,
    explanation: "Signal: palpable purpura, pulmonary hemorrhage, and rapidly worsening glomerulonephritis. Noise: bronchitis history does not explain renal injury and purpura. This fits microscopic polyangiitis."
  },
    // OB/GYN — DECIPHER
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "26F with a positive pregnancy test has light vaginal bleeding and unilateral pelvic pain. She says the pain feels like a prior ovarian cyst, but she has shoulder-tip discomfort and dizziness.",
    answers: ["Ectopic pregnancy", "Normal early pregnancy", "Endometriosis", "Pelvic inflammatory disease"],
    correct: 0,
    explanation: "Signal: early pregnancy with unilateral pelvic pain, bleeding, dizziness, and shoulder-tip pain. Noise: prior ovarian cyst history can distract, but pregnancy makes ectopic pregnancy the key concern."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "29F at 8 weeks gestation has vaginal bleeding and cramping. She passed a small clot at home and hopes everything is complete, but pelvic exam shows an open cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Complete abortion", "Missed abortion"],
    correct: 1,
    explanation: "Signal: early pregnancy bleeding with cramping and open cervical os. Noise: passing a clot does not prove complete abortion. Open os with ongoing symptoms fits inevitable abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "31F at 9 weeks gestation has mild vaginal spotting. She has no fever and only minimal cramping. Pelvic exam shows a closed cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Septic abortion", "Complete abortion"],
    correct: 0,
    explanation: "Signal: early pregnancy bleeding with closed cervical os. Noise: mild cramping can occur, but closed os and stable picture fit threatened abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "34F at 34 weeks gestation has painless bright red vaginal bleeding. She recently had intercourse and wonders if that caused it. The uterus is soft and nontender.",
    answers: ["Placenta previa", "Placental abruption", "Uterine rupture", "Preterm labor"],
    correct: 0,
    explanation: "Signal: painless third-trimester bleeding with soft nontender uterus. Noise: intercourse may trigger bleeding, but the classic pattern fits placenta previa."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "28F at 35 weeks gestation has vaginal bleeding, abdominal pain, uterine tenderness, and frequent contractions. She denies trauma, and the bleeding seems modest.",
    answers: ["Placenta previa", "Placental abruption", "Cervicitis", "Vasa previa"],
    correct: 1,
    explanation: "Signal: painful bleeding with uterine tenderness and contractions. Noise: bleeding amount may be modest and trauma may be absent. This fits placental abruption."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "30F at 32 weeks gestation has BP 166/108 mmHg, headache, visual symptoms, and RUQ pain. She says her swelling is mild and urine dipstick shows only trace protein.",
    answers: ["Gestational hypertension", "Preeclampsia with severe features", "Chronic hypertension", "HELLP syndrome only"],
    correct: 1,
    explanation: "Signal: severe-range BP with neurologic symptoms and RUQ pain. Noise: mild swelling and trace protein do not exclude severe preeclampsia when severe features are present."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "27F at 38 weeks gestation has a generalized seizure. Her partner says she has been sleep-deprived, but she had headache, visual spots, and elevated BP for several days.",
    answers: ["Epilepsy", "Eclampsia", "Syncope", "Panic attack"],
    correct: 1,
    explanation: "Signal: seizure in pregnancy with preceding preeclampsia symptoms. Noise: sleep deprivation can lower seizure threshold, but the pregnancy hypertension pattern fits eclampsia."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "25F at 30 weeks gestation has contractions every 6 minutes. She drank water at home and rested, but contractions persist and cervical dilation is progressing.",
    answers: ["Braxton Hicks contractions", "Preterm labor", "Placenta previa", "Round ligament pain"],
    correct: 1,
    explanation: "Signal: regular contractions with cervical change before 37 weeks. Noise: dehydration/Braxton Hicks concern is common, but cervical change defines preterm labor."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "32F at 41 weeks gestation reports decreased fetal movement. Nonstress test shows recurrent late decelerations. She says the baby is usually quiet at this time of day.",
    answers: ["Reassuring fetal status", "Uteroplacental insufficiency", "Cord compression", "Fetal sleep cycle"],
    correct: 1,
    explanation: "Signal: recurrent late decelerations after contractions. Noise: fetal sleep cycle does not explain late decelerations. This indicates uteroplacental insufficiency."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "24F in labor has abrupt fetal heart rate decelerations that vary in timing and shape. The tracing otherwise has moderate variability.",
    answers: ["Uteroplacental insufficiency", "Cord compression", "Normal fetal tracing", "Maternal fever"],
    correct: 1,
    explanation: "Signal: variable decelerations with abrupt onset and variable timing. Noise: moderate variability is reassuring overall, but the deceleration pattern points to cord compression."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "33F has heavy bleeding shortly after vaginal delivery. The placenta appears complete, and there are no obvious lacerations. Uterus is soft, enlarged, and boggy.",
    answers: ["Uterine atony", "Retained placenta", "Cervical laceration", "Uterine inversion"],
    correct: 0,
    explanation: "Signal: postpartum hemorrhage with boggy enlarged uterus. Noise: complete placenta and no laceration help steer away from other causes. This fits uterine atony."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "29F has fever two days after prolonged labor and cesarean delivery. She also has mild dysuria, but exam shows uterine tenderness and foul-smelling lochia.",
    answers: ["Endometritis", "Mastitis", "Urinary tract infection", "Wound dehiscence"],
    correct: 0,
    explanation: "Signal: postpartum fever with uterine tenderness and foul lochia after cesarean/prolonged labor. Noise: mild dysuria can distract toward UTI, but uterine findings fit endometritis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "30F who is breastfeeding has fever and a painful red wedge-shaped area on one breast. She is worried she must stop breastfeeding, but there is no fluctuance.",
    answers: ["Breast abscess", "Mastitis", "Inflammatory breast cancer", "Fibroadenoma"],
    correct: 1,
    explanation: "Signal: lactating patient with fever and focal painful breast erythema. Noise: breastfeeding concern is management-related; no fluctuance makes abscess less likely. This fits mastitis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "26F has pelvic pain, fever, cervical motion tenderness, and mucopurulent discharge. Pregnancy test is negative. She says the pain started after menses and feels crampy.",
    answers: ["Pelvic inflammatory disease", "Ectopic pregnancy", "Endometriosis", "Ovarian torsion"],
    correct: 0,
    explanation: "Signal: fever, cervical motion tenderness, and mucopurulent discharge. Noise: crampy post-menses pain can distract, but infectious pelvic findings fit PID."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "23F has sudden severe unilateral pelvic pain with nausea and vomiting. Pregnancy test is negative and she has no fever. Pain began while exercising.",
    answers: ["Ovarian torsion", "Pelvic inflammatory disease", "Endometriosis", "Mittelschmerz"],
    correct: 0,
    explanation: "Signal: sudden unilateral pelvic pain with nausea/vomiting and no infectious signs. Noise: exercise timing and negative pregnancy test do not exclude torsion. This fits ovarian torsion."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "35F has chronic pelvic pain, infertility, and deep dyspareunia. She says pain is worst around menses, but pelvic exam is not dramatically abnormal.",
    answers: ["Endometriosis", "Adenomyosis", "Pelvic inflammatory disease", "Ovarian torsion"],
    correct: 0,
    explanation: "Signal: cyclic pelvic pain, dyspareunia, and infertility. Noise: a subtle exam does not exclude endometriosis. This fits endometriosis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "43F has heavy painful menses and chronic pelvic pressure. Ultrasound does not show a discrete fibroid, and exam suggests a uniformly enlarged tender uterus.",
    answers: ["Adenomyosis", "Endometriosis", "Leiomyomas", "Endometrial cancer"],
    correct: 0,
    explanation: "Signal: heavy painful menses with diffusely enlarged tender uterus. Noise: pelvic pressure can suggest fibroids, but uniform tender enlargement fits adenomyosis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "39F has heavy menstrual bleeding and pelvic pressure. She has mild dysmenorrhea, but exam shows an enlarged irregular uterus.",
    answers: ["Leiomyomas", "Adenomyosis", "Endometriosis", "Endometrial hyperplasia"],
    correct: 0,
    explanation: "Signal: heavy bleeding, bulk symptoms, and irregular enlarged uterus. Noise: mild dysmenorrhea can occur, but irregular uterine enlargement fits leiomyomas."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "58F has postmenopausal bleeding. She thinks it is from vaginal dryness, but she has obesity, hypertension, and long-standing diabetes.",
    answers: ["Endometrial cancer", "Cervical ectropion", "Normal menopause", "Functional ovarian cyst"],
    correct: 0,
    explanation: "Signal: postmenopausal bleeding with unopposed estrogen risk factors. Noise: vaginal dryness can cause spotting, but this presentation requires evaluation for endometrial cancer."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "21F has thin gray discharge with fishy odor. She has minimal itching, no pelvic pain, and vaginal pH is greater than 4.5.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Physiologic discharge"],
    correct: 0,
    explanation: "Signal: malodorous thin gray discharge and elevated pH. Noise: minimal irritation can occur, but lack of thick pruritic discharge moves away from candidiasis. This fits bacterial vaginosis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "25F has intense vulvar itching and thick white discharge. She recently changed soaps, but vaginal pH is normal and she has no pelvic pain.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Chlamydia cervicitis"],
    correct: 1,
    explanation: "Signal: pruritus, thick white discharge, and normal pH. Noise: new soap can irritate, but the discharge pattern fits vulvovaginal candidiasis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "27F has frothy yellow-green discharge, vulvar irritation, and a strawberry cervix. She denies fever and pelvic pain.",
    answers: ["Trichomoniasis", "Bacterial vaginosis", "Candidiasis", "Atrophic vaginitis"],
    correct: 0,
    explanation: "Signal: frothy discharge, irritation, and strawberry cervix. Noise: no fever/pelvic pain makes PID less likely but does not exclude trichomoniasis."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "24F has irregular menses, acne, hirsutism, and difficulty becoming pregnant. Pregnancy test and prolactin are normal.",
    answers: ["PCOS", "Premature ovarian insufficiency", "Hyperprolactinemia", "Endometriosis"],
    correct: 0,
    explanation: "Signal: oligo-ovulation with hyperandrogenism and infertility. Noise: normal pregnancy/prolactin testing helps exclude common mimics. This fits PCOS."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "31F has amenorrhea and galactorrhea. Pregnancy test is negative. She also has headaches, but visual fields are normal.",
    answers: ["Hyperprolactinemia", "PCOS", "Asherman syndrome", "Primary ovarian insufficiency"],
    correct: 0,
    explanation: "Signal: amenorrhea with galactorrhea and negative pregnancy test. Noise: normal visual fields do not exclude hyperprolactinemia. This fits hyperprolactinemia."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "29F has secondary amenorrhea after dilation and curettage for postpartum hemorrhage. She has no hot flashes, and pregnancy test is negative.",
    answers: ["Asherman syndrome", "PCOS", "Pregnancy", "Endometriosis"],
    correct: 0,
    explanation: "Signal: amenorrhea after uterine instrumentation. Noise: absence of hot flashes makes ovarian failure less likely. This fits Asherman syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "52F has hot flashes, sleep disturbance, and vaginal dryness. She has not had menses for 12 months and pregnancy test is negative.",
    answers: ["Menopause", "PCOS", "Pregnancy", "Endometrial cancer"],
    correct: 0,
    explanation: "Signal: vasomotor symptoms, vaginal dryness, and 12 months of amenorrhea. Noise: pregnancy testing is reassuring but not the main clue. This fits menopause."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "17F has primary amenorrhea and cyclic pelvic pain. She has normal breast development. Exam shows a bulging bluish hymen.",
    answers: ["Imperforate hymen", "Turner syndrome", "Müllerian agenesis", "PCOS"],
    correct: 0,
    explanation: "Signal: primary amenorrhea with normal puberty, cyclic pain, and obstructed outflow. Noise: normal breast development rules against gonadal failure. This fits imperforate hymen."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "16F has primary amenorrhea, short stature, webbed neck, and broad chest. She has no breast development but normal external genitalia.",
    answers: ["Turner syndrome", "Müllerian agenesis", "Imperforate hymen", "Constitutional delay"],
    correct: 0,
    explanation: "Signal: primary amenorrhea with short stature, webbed neck, broad chest, and absent puberty. Noise: normal external genitalia does not exclude Turner syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "25F wants contraception and says she forgets pills frequently. She wants something highly effective for several years but reversible.",
    answers: ["Long-acting reversible contraception", "Withdrawal method", "Calendar method", "Spermicide alone"],
    correct: 0,
    explanation: "Signal: desire for highly effective reversible contraception without daily adherence. Noise: preference for reversibility does not mean short-acting methods. LARC fits best."
  },
  {
    topic: "OB/GYN",
    mode: "Decipher",
    vignette: "36F with migraine with aura requests contraception. She smokes occasionally and wants to avoid pregnancy. She asks for the combined pill because her friend likes it.",
    answers: ["Combined oral contraceptive", "Progestin-only method", "Estrogen patch", "Combined vaginal ring"],
    correct: 1,
    explanation: "Signal: migraine with aura and smoking increase stroke risk with estrogen. Noise: friend preference is irrelevant. A progestin-only method is safer."
  },

  // PEDIATRICS — DECIPHER
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "6-week-old boy vomits forcefully after feeds. His parents think it is reflux because he remains hungry afterward, but he is losing weight and has an olive-shaped epigastric mass.",
    answers: ["Pyloric stenosis", "Intussusception", "Malrotation with volvulus", "Gastroesophageal reflux"],
    correct: 0,
    explanation: "Signal: projectile nonbilious vomiting, persistent hunger, weight loss, and olive mass. Noise: reflux concern is common, but this pattern fits pyloric stenosis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "8-month-old boy has intermittent severe crying with knees drawn to the chest. Between episodes he appears tired but comfortable. Stool later becomes bloody and mucus-like.",
    answers: ["Intussusception", "Pyloric stenosis", "Hirschsprung disease", "Viral gastroenteritis"],
    correct: 0,
    explanation: "Signal: episodic colicky pain, knee flexion, lethargy between episodes, and currant-jelly stool. Noise: intermittent comfort can falsely reassure. This fits intussusception."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "2-day-old newborn has bilious vomiting and abdominal distension after feeding. The infant passed meconium, but symptoms are worsening.",
    answers: ["Malrotation with volvulus", "Pyloric stenosis", "Gastroesophageal reflux", "Milk protein allergy"],
    correct: 0,
    explanation: "Signal: bilious vomiting in a newborn with distension. Noise: passage of meconium does not exclude volvulus. This is malrotation with volvulus until proven otherwise."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "3-day-old newborn has not passed meconium and has abdominal distension. Parents report one small smear of stool, but rectal exam causes explosive stool release.",
    answers: ["Hirschsprung disease", "Pyloric stenosis", "Intussusception", "Meconium ileus only"],
    correct: 0,
    explanation: "Signal: delayed meconium, distension, and explosive stool after rectal exam. Noise: small smear does not rule out obstruction. This fits Hirschsprung disease."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "2-year-old has barking cough, hoarseness, and inspiratory stridor after a viral prodrome. He is worse at night but is not drooling and can drink fluids.",
    answers: ["Croup", "Epiglottitis", "Foreign body aspiration", "Bronchiolitis"],
    correct: 0,
    explanation: "Signal: barking cough, hoarseness, nocturnal worsening, and stridor after viral symptoms. Noise: stridor can sound alarming, but no drooling/toxic appearance favors croup."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "8-month-old has cough, wheezing, tachypnea, and poor feeding during winter after several days of runny nose. There is no prior wheezing history.",
    answers: ["Bronchiolitis", "Croup", "Asthma", "Epiglottitis"],
    correct: 0,
    explanation: "Signal: infant with viral URI followed by wheezing, tachypnea, and poor feeding. Noise: wheeze can suggest asthma, but age and first episode fit bronchiolitis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "4-year-old suddenly develops high fever, drooling, muffled voice, tripod positioning, and severe respiratory distress. Parents say symptoms started like a sore throat.",
    answers: ["Epiglottitis", "Croup", "Bronchiolitis", "Viral pharyngitis"],
    correct: 0,
    explanation: "Signal: toxic child with drooling, muffled voice, tripod posture, and airway distress. Noise: sore throat onset is nonspecific. This fits epiglottitis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "2-year-old suddenly coughs and wheezes while playing with small toys. He has no fever and one side has decreased breath sounds.",
    answers: ["Foreign body aspiration", "Asthma", "Croup", "Bronchiolitis"],
    correct: 0,
    explanation: "Signal: abrupt cough/wheeze during play with unilateral decreased breath sounds. Noise: wheezing can suggest asthma, but sudden onset during toy play fits foreign body aspiration."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "5-year-old has 5 days of fever, conjunctivitis, cracked lips, swollen hands, rash, and cervical lymphadenopathy. Rapid strep testing is negative.",
    answers: ["Kawasaki disease", "Measles", "Scarlet fever", "Juvenile idiopathic arthritis"],
    correct: 0,
    explanation: "Signal: prolonged fever with conjunctivitis, mucosal changes, extremity changes, rash, and lymphadenopathy. Noise: negative strep helps move away from scarlet fever. This fits Kawasaki disease."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "7-year-old has fever, migratory joint pain, new murmur, and involuntary movements several weeks after a sore throat. The sore throat resolved without antibiotics.",
    answers: ["Acute rheumatic fever", "Kawasaki disease", "Juvenile idiopathic arthritis", "Septic arthritis"],
    correct: 0,
    explanation: "Signal: migratory arthritis, carditis, chorea, and prior untreated strep pharyngitis. Noise: current throat symptoms may be absent. This fits acute rheumatic fever."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "3-year-old refuses to bear weight and has fever. His hip is held flexed and externally rotated. Parents say he had a mild cold last week.",
    answers: ["Septic arthritis", "Transient synovitis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease"],
    correct: 0,
    explanation: "Signal: fever, severe hip pain, and refusal to bear weight. Noise: recent viral illness can suggest transient synovitis, but fever and toxic joint posture require concern for septic arthritis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "7-year-old boy has painless limp and chronic groin pain. He has no fever and no recent trauma. Hip abduction is limited.",
    answers: ["Legg-Calvé-Perthes disease", "Septic arthritis", "Slipped capital femoral epiphysis", "Transient synovitis"],
    correct: 0,
    explanation: "Signal: school-aged child with painless limp, chronic groin pain, and limited hip motion. Noise: lack of trauma does not reassure. This fits Legg-Calvé-Perthes disease."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "13-year-old overweight boy has knee pain after gym class. Exam shows limited internal rotation of the hip and an externally rotated leg.",
    answers: ["Slipped capital femoral epiphysis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease", "Septic arthritis"],
    correct: 0,
    explanation: "Signal: overweight adolescent with referred knee pain, limited hip internal rotation, and external rotation. Noise: gym class can imply strain, but this fits SCFE."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "15-year-old runner has anterior knee pain after activity. The knee joint itself is not swollen, but there is focal tenderness over the tibial tubercle.",
    answers: ["Osgood-Schlatter disease", "Septic arthritis", "Patellar dislocation", "Slipped capital femoral epiphysis"],
    correct: 0,
    explanation: "Signal: adolescent athlete with activity-related tibial tubercle pain. Noise: knee pain broadly can suggest intra-articular disease, but focal tubercle tenderness fits Osgood-Schlatter disease."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "2-year-old has multiple bruises in different stages of healing and a spiral fracture. Caregiver says he “falls a lot,” but the injury pattern does not match the story.",
    answers: ["Nonaccidental trauma", "Osteogenesis imperfecta", "Normal toddler injuries", "Vitamin D deficiency"],
    correct: 0,
    explanation: "Signal: injuries inconsistent with history and bruises in different healing stages. Noise: toddlers fall often, but this pattern fits nonaccidental trauma."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "18-month-old has fever and a generalized seizure lasting 3 minutes. He returns to baseline quickly. Parents worry because a cousin has epilepsy.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Infantile spasms"],
    correct: 0,
    explanation: "Signal: brief generalized seizure with fever and rapid return to baseline. Noise: family epilepsy concern is less important than the simple febrile seizure pattern."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "6-month-old has clusters of brief flexion spasms after waking. Parents thought it was startle, but developmental milestones are regressing.",
    answers: ["Infantile spasms", "Absence seizures", "Simple febrile seizure", "Breath-holding spells"],
    correct: 0,
    explanation: "Signal: clustered flexion spasms in infancy with developmental regression. Noise: startle-like appearance can mislead. This fits infantile spasms."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "8-year-old has frequent brief staring spells at school with eyelid fluttering. Teachers think she is daydreaming, but she immediately resumes activity afterward.",
    answers: ["Absence seizures", "Focal impaired awareness seizures", "Syncope", "ADHD"],
    correct: 0,
    explanation: "Signal: brief staring episodes with eyelid fluttering and immediate return to baseline. Noise: daydreaming/ADHD concern is common. This fits absence seizures."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "4-year-old has polyuria, polydipsia, weight loss, vomiting, and deep rapid breathing. Parents think it is a stomach virus, but he appears dehydrated.",
    answers: ["Diabetic ketoacidosis", "Type 2 diabetes", "Gastroenteritis", "Diabetes insipidus"],
    correct: 0,
    explanation: "Signal: hyperglycemic symptoms, weight loss, vomiting, dehydration, and Kussmaul breathing. Noise: vomiting can suggest gastroenteritis, but the full pattern fits DKA."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "10-year-old has cola-colored urine, edema, and hypertension after a throat infection. He has no flank pain and no dysuria.",
    answers: ["Poststreptococcal glomerulonephritis", "Minimal change disease", "IgA nephropathy", "Nephrolithiasis"],
    correct: 0,
    explanation: "Signal: nephritic syndrome after recent throat infection. Noise: absence of dysuria/flank pain helps move away from UTI/stone. This fits poststreptococcal glomerulonephritis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "5-year-old has periorbital edema, leg swelling, and heavy proteinuria after a viral illness. BP is normal and urinalysis has no red blood cell casts.",
    answers: ["Minimal change disease", "Poststreptococcal glomerulonephritis", "IgA nephropathy", "Henoch-Schönlein purpura"],
    correct: 0,
    explanation: "Signal: nephrotic syndrome in a child after viral illness with normal BP and no active sediment. Noise: recent infection can distract toward nephritic disease, but this fits minimal change disease."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "6-year-old has palpable purpura on the legs, abdominal pain, joint pain, and hematuria. Platelet count is normal.",
    answers: ["IgA vasculitis", "ITP", "Meningococcemia", "Kawasaki disease"],
    correct: 0,
    explanation: "Signal: palpable purpura, abdominal pain, arthralgia, renal involvement, and normal platelets. Noise: purpura can suggest thrombocytopenia, but normal platelets favor IgA vasculitis."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "3-week-old has jaundice, vomiting, poor feeding, hepatomegaly, and cataracts after starting milk feeds. Parents ask if it is normal newborn jaundice.",
    answers: ["Galactosemia", "Physiologic jaundice", "Breast milk jaundice", "Biliary atresia"],
    correct: 0,
    explanation: "Signal: jaundice with vomiting, liver dysfunction, poor feeding, and cataracts after milk exposure. Noise: newborn jaundice is common, but systemic illness and cataracts fit galactosemia."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "6-week-old has persistent jaundice, pale stools, dark urine, and hepatomegaly. The infant otherwise feeds reasonably well.",
    answers: ["Biliary atresia", "Breast milk jaundice", "Physiologic jaundice", "Gilbert syndrome"],
    correct: 0,
    explanation: "Signal: persistent conjugated jaundice with pale stools, dark urine, and hepatomegaly. Noise: reasonable feeding does not exclude biliary atresia."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "2-year-old has developmental regression, poor eye contact, repetitive hand movements, and loss of social engagement. Hearing screen is normal.",
    answers: ["Autism spectrum disorder", "Normal development", "ADHD", "Oppositional defiant disorder"],
    correct: 0,
    explanation: "Signal: impaired social communication with restricted/repetitive behaviors and regression. Noise: normal hearing helps exclude hearing loss as the explanation. This fits autism spectrum disorder."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "8-year-old is inattentive, impulsive, and disruptive at school and home for more than 6 months. Symptoms are present even when he understands the work.",
    answers: ["ADHD", "Autism spectrum disorder", "Normal behavior", "Specific learning disorder"],
    correct: 0,
    explanation: "Signal: persistent inattention/hyperactivity across multiple settings. Noise: academic difficulty alone might suggest learning disorder, but symptoms occur beyond schoolwork. This fits ADHD."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "Newborn has cyanosis that worsens during feeding and improves when crying. Lung exam is clear and cardiac exam is not remarkable.",
    answers: ["Choanal atresia", "Tetralogy of Fallot", "Transient tachypnea", "Laryngomalacia"],
    correct: 0,
    explanation: "Signal: cyanosis worsened by feeding and relieved by crying. Noise: clear lungs and unremarkable cardiac exam steer away from pulmonary/cardiac causes. This fits choanal atresia."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "Infant has recurrent cyanotic spells and a harsh systolic murmur. Parents notice episodes improve when the child squats or draws knees to chest.",
    answers: ["Tetralogy of Fallot", "Ventricular septal defect", "Patent ductus arteriosus", "Atrial septal defect"],
    correct: 0,
    explanation: "Signal: cyanotic spells relieved by squatting/knee-chest position with harsh systolic murmur. Noise: murmur alone is nonspecific; cyanotic spells point to tetralogy of Fallot."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "Premature infant has respiratory distress shortly after birth with grunting and nasal flaring. The delivery was uncomplicated, but imaging shows diffuse atelectasis.",
    answers: ["Neonatal respiratory distress syndrome", "Transient tachypnea of newborn", "Meconium aspiration", "Choanal atresia"],
    correct: 0,
    explanation: "Signal: prematurity, early respiratory distress, and diffuse atelectasis. Noise: uncomplicated delivery does not change surfactant deficiency risk. This fits neonatal RDS."
  },
  {
    topic: "Pediatrics",
    mode: "Decipher",
    vignette: "Term newborn delivered by cesarean has tachypnea shortly after birth. Oxygen need is mild, and symptoms improve over the first day.",
    answers: ["Transient tachypnea of newborn", "Neonatal respiratory distress syndrome", "Meconium aspiration", "Pneumonia"],
    correct: 0,
    explanation: "Signal: term cesarean infant with mild early tachypnea that improves within 24 hours. Noise: respiratory distress sounds serious, but the course fits transient tachypnea of the newborn."
  },
    // SURGERY / EMERGENCY — DECIPHER
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "22M has abdominal pain that began near the umbilicus and moved to the right lower quadrant. He had one loose stool, but now has anorexia, nausea, and focal tenderness at McBurney point.",
    answers: ["Appendicitis", "Gastroenteritis", "Diverticulitis", "Renal colic"],
    correct: 0,
    explanation: "Signal: migratory periumbilical-to-RLQ pain with anorexia, nausea, and focal RLQ tenderness. Noise: one loose stool can distract toward gastroenteritis, but the migration pattern fits appendicitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "37F has RUQ pain after a fatty meal. Similar episodes previously resolved, but this one persists with fever and inspiratory arrest during RUQ palpation.",
    answers: ["Acute cholecystitis", "Biliary colic", "Acute pancreatitis", "Appendicitis"],
    correct: 0,
    explanation: "Signal: persistent RUQ pain, fever, and Murphy sign. Noise: prior transient episodes suggest biliary colic history, but current inflammatory symptoms fit acute cholecystitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "59M has severe epigastric pain radiating to the back after heavy alcohol use. He worries it is heartburn, but he has repeated vomiting and pain improves slightly when leaning forward.",
    answers: ["Acute pancreatitis", "Perforated ulcer", "GERD", "Bowel obstruction"],
    correct: 0,
    explanation: "Signal: severe epigastric back-radiating pain after alcohol with vomiting and relief leaning forward. Noise: heartburn attribution is misleading. This fits acute pancreatitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "62M has sudden severe abdominal pain after taking NSAIDs for knee pain. He initially thought it was indigestion, but exam shows rigid abdomen and upright chest x-ray shows free air under the diaphragm.",
    answers: ["Perforated viscus", "Small bowel obstruction", "Appendicitis", "Diverticulitis"],
    correct: 0,
    explanation: "Signal: sudden severe pain, peritonitis, NSAID risk, and free intraperitoneal air. Noise: indigestion attribution does not explain rigidity/free air. This fits perforated viscus."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "69F with prior abdominal surgeries has crampy abdominal pain, vomiting, distension, and obstipation. She passed a little gas earlier, but bowel sounds are high-pitched.",
    answers: ["Small bowel obstruction", "Gastroenteritis", "Mesenteric ischemia", "Pancreatitis"],
    correct: 0,
    explanation: "Signal: prior surgery, crampy pain, vomiting, distension, obstipation, and high-pitched bowel sounds. Noise: passing some gas earlier does not exclude obstruction. This fits SBO."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "75M with atrial fibrillation has sudden severe abdominal pain. Exam is surprisingly benign. He had mild diarrhea yesterday, but now has pain out of proportion and bloody stool.",
    answers: ["Mesenteric ischemia", "Appendicitis", "Gastroenteritis", "Diverticulitis"],
    correct: 0,
    explanation: "Signal: AFib embolic risk, sudden pain out of proportion, and bloody stool. Noise: mild prior diarrhea can distract, but the vascular-risk pattern fits mesenteric ischemia."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "72M smoker has sudden tearing abdominal and back pain. He says he has had back pain before, but now he is hypotensive and has a pulsatile abdominal mass.",
    answers: ["Ruptured abdominal aortic aneurysm", "Renal colic", "Pancreatitis", "Aortic stenosis"],
    correct: 0,
    explanation: "Signal: older smoker with sudden abdominal/back pain, hypotension, and pulsatile mass. Noise: prior back pain history should not distract from ruptured AAA."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "64M has sudden painful cold pale leg with absent pulses and numbness. He has chronic calf pain with walking, but this episode began abruptly.",
    answers: ["Acute limb ischemia", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "Signal: sudden pain, pallor, pulselessness, coldness, and neurologic symptoms. Noise: chronic claudication history may exist, but abrupt pulseless limb is acute limb ischemia."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "26M has severe testicular pain and nausea after waking. He denies dysuria and fever. Exam shows a high-riding testis and absent cremasteric reflex.",
    answers: ["Testicular torsion", "Epididymitis", "Inguinal hernia", "Hydrocele"],
    correct: 0,
    explanation: "Signal: sudden severe testicular pain, nausea, high-riding testis, and absent cremasteric reflex. Noise: lack of urinary symptoms moves away from epididymitis. This fits torsion."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "31M has colicky flank pain radiating to the groin with nausea. He is pacing around the room. He has no fever, and urinalysis shows hematuria.",
    answers: ["Ureteral stone", "Pyelonephritis", "Appendicitis", "Testicular torsion"],
    correct: 0,
    explanation: "Signal: colicky flank-to-groin pain, restlessness, nausea, and hematuria. Noise: severe pain can mimic many emergencies, but afebrile hematuric colic fits ureteral stone."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "28M after tibial fracture has escalating leg pain despite opioids. Pulses are still present, but compartments are tense and passive toe extension causes severe pain.",
    answers: ["Compartment syndrome", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "Signal: severe escalating pain, tense compartments, and pain with passive stretch after fracture. Noise: present pulses do not exclude compartment syndrome."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "45M has rapidly spreading leg pain and fever after a small scrape. The skin changes look modest at first, but pain is severe, crepitus develops, and he appears toxic.",
    answers: ["Necrotizing fasciitis", "Cellulitis", "Deep vein thrombosis", "Erysipelas"],
    correct: 0,
    explanation: "Signal: pain out of proportion, rapid progression, crepitus, and systemic toxicity. Noise: small initial scrape and modest early skin findings can falsely reassure. This fits necrotizing fasciitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Burn patient from a house fire has facial burns and singed nasal hairs. Oxygen saturation is currently 98%, but voice is hoarse and soot is visible in the mouth.",
    answers: ["Early endotracheal intubation", "Topical antibiotics only", "Outpatient follow-up", "Oral steroids"],
    correct: 0,
    explanation: "Signal: inhalation injury risk with facial burns, soot, and hoarseness. Noise: normal current oxygen saturation does not protect against impending airway edema. Early intubation is needed."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Trauma patient after a stab wound has hypotension and distended neck veins. Breath sounds are equal bilaterally, and heart sounds are muffled.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Hemothorax", "Pulmonary contusion"],
    correct: 0,
    explanation: "Signal: penetrating trauma with hypotension, JVD, muffled heart sounds, and equal breath sounds. Noise: shock after chest trauma can suggest pneumothorax, but equal breath sounds support tamponade."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Trauma patient has hypotension, severe respiratory distress, absent breath sounds on one side, and tracheal deviation. A chest x-ray has not yet been obtained.",
    answers: ["Tension pneumothorax", "Cardiac tamponade", "Flail chest", "Pulmonary embolism"],
    correct: 0,
    explanation: "Signal: obstructive shock with unilateral absent breath sounds and tracheal deviation. Noise: lack of x-ray should not delay treatment. This fits tension pneumothorax."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient after blunt chest trauma has severe pain with breathing. He also has bruising, but the key finding is paradoxical movement of a chest wall segment.",
    answers: ["Flail chest", "Tension pneumothorax", "Cardiac tamponade", "Rib contusion"],
    correct: 0,
    explanation: "Signal: paradoxical chest wall motion after trauma. Noise: bruising and pain are nonspecific; paradoxical segment movement fits flail chest."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Postoperative patient on day 2 has low-grade fever, dyspnea, and mild hypoxemia after shallow breathing due to pain. The incision is clean and there is no calf swelling.",
    answers: ["Atelectasis", "Wound infection", "Pulmonary embolism", "Anastomotic leak"],
    correct: 0,
    explanation: "Signal: early postoperative fever and hypoxemia from shallow breathing. Noise: fever after surgery can suggest infection, but day 2 with clean incision fits atelectasis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Postoperative patient on day 5 has fever. She also has mild atelectasis on imaging, but the incision is warm, erythematous, and draining pus.",
    answers: ["Surgical site infection", "Atelectasis", "Deep vein thrombosis", "Urinary retention"],
    correct: 0,
    explanation: "Signal: postoperative fever with erythema, warmth, and purulent wound drainage. Noise: mild atelectasis may coexist but does not explain pus from incision. This fits surgical site infection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Elderly patient has sudden painless bright red blood per rectum. She has mild cramping from anxiety, but abdomen is soft and nontender.",
    answers: ["Diverticular bleeding", "Ischemic colitis", "Anal fissure", "Peptic ulcer bleeding"],
    correct: 0,
    explanation: "Signal: painless lower GI bleeding in an older adult with benign abdominal exam. Noise: mild cramping/anxiety should not distract. This fits diverticular bleeding."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has severe anal pain during defecation with bright red blood on toilet paper. He has no weight loss, and bleeding is small volume.",
    answers: ["Anal fissure", "Internal hemorrhoids", "Diverticular bleeding", "Colorectal cancer"],
    correct: 0,
    explanation: "Signal: severe defecation pain with small-volume bright red blood. Noise: rectal bleeding broadly raises concern, but pain with defecation fits anal fissure."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient notices bright red blood coating stool. He has palpable perianal swelling but little pain. He is worried about cancer because of the blood.",
    answers: ["Hemorrhoids", "Anal fissure", "Ischemic colitis", "Inflammatory bowel disease"],
    correct: 0,
    explanation: "Signal: painless bright red bleeding with perianal swelling. Noise: cancer concern is understandable, but this classic pattern fits hemorrhoids."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient with prior laparotomy has vomiting, crampy abdominal pain, distension, and high-pitched bowel sounds. He passed a small stool this morning.",
    answers: ["Mechanical bowel obstruction", "Ileus", "Gastroenteritis", "Cholecystitis"],
    correct: 0,
    explanation: "Signal: prior surgery with crampy pain, vomiting, distension, and high-pitched bowel sounds. Noise: passing a small stool does not exclude early/partial obstruction."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Postoperative patient has abdominal distension, nausea, and absent bowel sounds after opioid use. Imaging shows diffuse bowel gas without a transition point.",
    answers: ["Ileus", "Mechanical bowel obstruction", "Mesenteric ischemia", "Appendicitis"],
    correct: 0,
    explanation: "Signal: postoperative opioid-associated distension with absent bowel sounds and no transition point. Noise: vomiting/distension can suggest obstruction, but diffuse gas pattern fits ileus."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has fever, jaundice, RUQ pain, confusion, and hypotension. He had gallstone pain for months but now appears septic.",
    answers: ["Ascending cholangitis", "Acute cholecystitis", "Viral hepatitis", "Pancreatitis"],
    correct: 0,
    explanation: "Signal: Charcot triad plus hypotension and confusion. Noise: prior biliary colic history is background; current septic obstructive picture fits severe ascending cholangitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has painless jaundice, weight loss, dark urine, pale stools, and a palpable nontender gallbladder. He denies fever or RUQ tenderness.",
    answers: ["Pancreatic cancer", "Acute hepatitis", "Choledocholithiasis", "Acute cholecystitis"],
    correct: 0,
    explanation: "Signal: painless obstructive jaundice, weight loss, pale stools, dark urine, and nontender gallbladder. Noise: absence of fever/RUQ tenderness moves away from acute biliary infection. This fits pancreatic cancer."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has sudden severe tearing chest pain radiating to the back. He also feels nauseated, but the key finding is unequal arm blood pressures.",
    answers: ["Aortic dissection", "Acute MI", "Pulmonary embolism", "Pericarditis"],
    correct: 0,
    explanation: "Signal: tearing chest/back pain with blood pressure asymmetry. Noise: nausea can occur in MI, but unequal arm pressures point to aortic dissection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient with blunt abdominal trauma has hypotension, abdominal tenderness, and left shoulder pain. FAST exam suggests free fluid.",
    answers: ["Splenic rupture", "Appendicitis", "Renal colic", "Pancreatitis"],
    correct: 0,
    explanation: "Signal: blunt trauma with hypotension, free fluid, abdominal tenderness, and referred left shoulder pain. Noise: shoulder pain alone is nonspecific, but this pattern fits splenic rupture."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient after pelvic fracture cannot urinate and has blood at the urethral meatus. The bladder feels full.",
    answers: ["Urethral injury", "Bladder infection", "Renal stone", "Testicular torsion"],
    correct: 0,
    explanation: "Signal: pelvic fracture with blood at the meatus and urinary retention. Noise: full bladder may tempt catheterization, but findings indicate urethral injury."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has lower abdominal pain and inability to urinate after starting an anticholinergic medication. Bladder is distended and tender.",
    answers: ["Acute urinary retention", "Pyelonephritis", "Renal infarction", "Ureteral stone"],
    correct: 0,
    explanation: "Signal: suprapubic pain, inability to void, and distended bladder. Noise: medication trigger is context, but the diagnosis is acute urinary retention."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Decipher",
    vignette: "Patient has fever, drooling, muffled voice, and trismus after dental infection. He initially thought it was a sore throat, but neck swelling is progressing.",
    answers: ["Deep neck space infection", "Viral pharyngitis", "GERD", "Allergic rhinitis"],
    correct: 0,
    explanation: "Signal: fever with drooling, muffled voice, trismus, dental source, and progressive neck swelling. Noise: sore throat attribution is misleading. This fits deep neck space infection."
  },

  // QUALITY / PATIENT SAFETY — DECIPHER
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospitalized patient receives the wrong medication because two patients with similar names are in adjacent rooms. The nurse checked the room number, but not date of birth or medical record number.",
    answers: ["Use two patient identifiers", "Ask the patient’s room number", "Rely on the medication label", "Move one patient after the error"],
    correct: 0,
    explanation: "Signal: wrong-patient error from similar names and location-based identification. Noise: room number was checked, but room number is not a reliable patient identifier. Use two identifiers."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient deteriorates overnight after the day team verbally mentioned a pending potassium result but did not document it. The night team says sign-out was otherwise detailed.",
    answers: ["Standardized handoff tool", "Longer resident shifts", "Verbal reminders only", "More frequent paging"],
    correct: 0,
    explanation: "Signal: omitted critical pending task during handoff. Noise: the handoff being otherwise detailed does not fix unreliable communication. A standardized handoff tool is best."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A surgical team nearly operates on the wrong side because the consent and schedule list different laterality. The surgeon says he remembers the correct side.",
    answers: ["Preoperative time-out", "Postoperative debriefing", "Incident report only", "Faster room turnover"],
    correct: 0,
    explanation: "Signal: wrong-site surgery risk from laterality mismatch. Noise: surgeon memory is not a reliable safety barrier. Preoperative time-out confirms patient, procedure, and laterality."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "Several ICU patients develop central-line bloodstream infections over one month. Staff already use antibiotics appropriately, but insertion sterile technique varies by operator.",
    answers: ["Central-line insertion checklist", "Longer antibiotic courses", "Daily blood cultures for everyone", "More frequent room cleaning only"],
    correct: 0,
    explanation: "Signal: preventable line infections tied to inconsistent insertion practices. Noise: antibiotic use is not the key prevention step. A sterile insertion checklist reduces CLABSI."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient develops ventilator-associated pneumonia after prolonged intubation. Nurses report that head-of-bed elevation and sedation interruption are inconsistently performed.",
    answers: ["Ventilator care bundle", "Routine broad antibiotics", "Daily chest CT", "Delay extubation"],
    correct: 0,
    explanation: "Signal: inconsistent VAP-prevention practices in an intubated patient. Noise: antibiotics treat infection but do not address prevention. Ventilator care bundle is best."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A nurse notices that a medication dose seems ten times higher than usual. The prescriber says it is fine, but the electronic alert also flags the dose.",
    answers: ["Escalate using chain of command", "Administer as ordered", "Wait until next shift", "Ask the family to decide"],
    correct: 0,
    explanation: "Signal: unresolved high-risk medication concern supported by an alert. Noise: prescriber reassurance does not remove the safety concern. Escalate through chain of command."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient falls walking to the bathroom at night after receiving a sedating medication. The patient had not previously fallen during admission.",
    answers: ["Fall risk assessment and prevention plan", "Bed rest for all patients", "Physical restraints", "Nocturnal fluid restriction"],
    correct: 0,
    explanation: "Signal: new fall risk after sedating medication and nighttime toileting. Noise: no prior fall does not mean low risk. Use targeted fall assessment and prevention."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A diabetic patient is discharged with insulin instructions. The paperwork is complete, but the patient returns with severe hypoglycemia after misunderstanding the dosing schedule.",
    answers: ["Teach-back before discharge", "Longer discharge paperwork", "Avoid insulin prescriptions", "Only verbal instructions"],
    correct: 0,
    explanation: "Signal: patient misunderstanding despite written instructions. Noise: complete paperwork does not prove understanding. Teach-back confirms comprehension."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient is readmitted because the outpatient physician never received the discharge summary. The patient says he was told to follow up but did not know what changed.",
    answers: ["Improve care transitions", "Change inpatient antibiotic", "Increase length of stay", "Avoid outpatient follow-up"],
    correct: 0,
    explanation: "Signal: failed communication across care settings. Noise: patient was told to follow up, but outpatient clinician lacked critical information. Improve care transitions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient’s home diuretic is unintentionally omitted on admission, causing worsening heart failure. The medication was listed in an outside pharmacy record but not in the admission note.",
    answers: ["Medication reconciliation", "Daily weights only", "Pharmacy billing review", "Patient satisfaction survey"],
    correct: 0,
    explanation: "Signal: medication omission during admission from incomplete home med review. Noise: outside record existed but was not reconciled. Medication reconciliation prevents omissions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A clinic wants to test whether a new reminder script improves vaccine uptake. They plan to try it with one physician for one week before expanding.",
    answers: ["Plan-Do-Study-Act cycle", "Root cause analysis", "Case-control study", "Randomized trial only"],
    correct: 0,
    explanation: "Signal: small rapid test of a workflow change before broader implementation. Noise: it involves data, but this is QI testing rather than formal randomized research. This is PDSA."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital reviews a fatal medication error. Leaders want to identify system factors such as labeling, staffing, and order-entry design that allowed it to happen.",
    answers: ["Root cause analysis", "PDSA cycle", "Cost-effectiveness analysis", "Patient satisfaction survey"],
    correct: 0,
    explanation: "Signal: serious adverse event review focused on system contributors. Noise: individual error may be visible, but RCA asks why the system allowed it."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A trainee gives the wrong medication and the patient develops hypotension. The team corrects it quickly, and the patient recovers. They wonder whether disclosure is still needed.",
    answers: ["Disclose the error to the patient", "Hide the error if harm is minor", "Tell only the hospital lawyer", "Wait for the patient to ask"],
    correct: 0,
    explanation: "Signal: harmful medical error occurred, even if transient. Noise: recovery does not remove the duty to disclose. The error should be disclosed honestly."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A wrong dose is almost administered but a nurse catches it before it reaches the patient. The resident says no report is needed because no harm occurred.",
    answers: ["Report as a near miss", "Ignore because no harm occurred", "Punish the nurse", "Delete the order silently"],
    correct: 0,
    explanation: "Signal: error reached the system but was caught before harm. Noise: no harm occurred, but near misses should still be reported to improve safety."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital wants to reduce catheter-associated UTIs. Many patients still have urinary catheters after they are no longer needed.",
    answers: ["Remove unnecessary urinary catheters", "Routine antibiotics for all catheterized patients", "Daily urine cultures", "Use larger catheters"],
    correct: 0,
    explanation: "Signal: avoidable catheter days driving CAUTI risk. Noise: cultures/antibiotics are reactive; removing unnecessary catheters prevents infection."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient develops a pressure ulcer after prolonged immobility. The mattress was upgraded, but nurses report repositioning was inconsistent.",
    answers: ["Scheduled turning and pressure offloading", "Routine antibiotics", "Strict bed rest", "Daily blood cultures"],
    correct: 0,
    explanation: "Signal: pressure injury from immobility and inconsistent repositioning. Noise: mattress upgrade alone is insufficient. Scheduled turning and offloading are needed."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient receives opioid pain medication and is later found oversedated with slow respirations. The pain score had improved, but sedation was not reassessed.",
    answers: ["Sedation monitoring after opioids", "Avoid pain assessment", "Use opioids without reassessment", "Discharge immediately"],
    correct: 0,
    explanation: "Signal: opioid-related respiratory depression from inadequate reassessment. Noise: improved pain score does not guarantee safety. Sedation and respiratory monitoring are required."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital wants to track how often antibiotics are given within 1 hour before incision. They are not yet measuring infection rates.",
    answers: ["Process measure", "Outcome measure", "Balancing measure", "Root cause"],
    correct: 0,
    explanation: "Signal: measuring whether a care step occurred. Noise: antibiotics influence outcomes, but the metric itself is a process measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital tracks postoperative infection rates after implementing a checklist. They also track checklist completion separately.",
    answers: ["Outcome measure", "Process measure", "Balancing measure", "Structural measure"],
    correct: 0,
    explanation: "Signal: infection rate is the result of care. Noise: checklist completion is process, but infection rate is an outcome measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A new discharge program reduces readmissions but causes a dramatic rise in urgent clinic calls. Leaders want to know whether this is an unintended effect.",
    answers: ["Balancing measure", "Outcome measure", "Process measure", "Sentinel event"],
    correct: 0,
    explanation: "Signal: measuring an unintended consequence of an intervention. Noise: readmissions improved, but increased calls are a balancing measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A nurse is afraid to report near misses because prior reports led to public blame. The unit wants more reporting without ignoring reckless behavior.",
    answers: ["Just culture", "Individual blame culture", "More secrecy", "Fewer incident reports"],
    correct: 0,
    explanation: "Signal: need to encourage safety reporting while maintaining accountability. Noise: not all accountability is blame. This is just culture."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient receives a drug despite a documented allergy because the allergy was buried in a scanned outside record and did not trigger an alert.",
    answers: ["Improve allergy documentation and alerts", "Remove allergy lists", "Rely on patient wristband only", "Avoid all medications"],
    correct: 0,
    explanation: "Signal: allergy information existed but was not accessible/actionable. Noise: documentation alone is insufficient. Improve allergy documentation and alerts."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient with limited English proficiency signs consent after her adult son translates. The son seems fluent, but the procedure has major risks.",
    answers: ["Use a professional medical interpreter", "Proceed because family translated", "Use gestures only", "Delay all care indefinitely"],
    correct: 0,
    explanation: "Signal: informed consent with limited English proficiency and high-risk procedure. Noise: family member fluency is not enough. Use a professional medical interpreter."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A confused hospitalized patient pulls out IV lines and tries to climb out of bed. Staff ask for restraints immediately, but he recently received sedating medication and has urinary retention.",
    answers: ["Evaluate reversible causes and use least restrictive safety measures", "Immediately apply permanent restraints", "Ignore behavior", "Sedate without assessment"],
    correct: 0,
    explanation: "Signal: delirium-like unsafe behavior with reversible contributors. Noise: immediate restraint request is tempting, but first evaluate causes and use least restrictive measures."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A clinician prescribes a nephrotoxic medication at a standard dose. The patient has CKD, but the electronic ordering system did not display renal dosing guidance.",
    answers: ["Clinical decision support for renal dosing", "More handwritten orders", "Avoid all medications", "Delay labs until discharge"],
    correct: 0,
    explanation: "Signal: adverse drug risk from missing renal dosing support. Noise: standard dosing may be common, but CKD requires dose-aware decision support."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient with sepsis waits several hours for antibiotics because worsening vital signs were not recognized. Nurses documented vitals, but no alert or escalation occurred.",
    answers: ["Early warning system", "Longer progress notes", "Fewer vital sign checks", "Delayed triage"],
    correct: 0,
    explanation: "Signal: failure to recognize deterioration despite available vital signs. Noise: documentation existed, but it did not trigger action. Early warning systems help identify deterioration."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital wants to reduce omissions during ICU-to-ward transfer. Current phone sign-outs vary widely by resident.",
    answers: ["Structured transfer checklist", "Unstructured phone call only", "Shorter transfer note", "Delay all transfers"],
    correct: 0,
    explanation: "Signal: variable transfer communication causing omitted information. Noise: phone calls can be useful, but unstructured calls are unreliable. Use a structured transfer checklist."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A patient receives duplicate anticoagulation because outpatient apixaban and inpatient heparin orders remain active. Both were individually appropriate at different times.",
    answers: ["Medication reconciliation", "More frequent INR checks only", "Avoid anticoagulants permanently", "Ask the patient to choose"],
    correct: 0,
    explanation: "Signal: duplicate therapy from unreconciled active medication lists. Noise: each drug can be appropriate alone, but the combined duplication reflects reconciliation failure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A hospital compares infection rates between units and sends each unit monthly reports. No new rule is introduced initially; the goal is to show performance gaps.",
    answers: ["Audit and feedback", "Root cause analysis only", "Case report", "Blame meeting"],
    correct: 0,
    explanation: "Signal: measuring performance and feeding data back to clinicians/units. Noise: no immediate intervention is required for audit and feedback to be useful."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Decipher",
    vignette: "A resident is interrupted repeatedly while entering medication orders and accidentally selects the wrong dose. The order screen has many similar-looking options.",
    answers: ["Reduce interruptions during order entry", "Add more pop-up alerts", "Punish the resident", "Eliminate electronic orders"],
    correct: 0,
    explanation: "Signal: human factors problem from interruptions and look-alike order options. Noise: blaming the resident misses the system design issue. Reduce interruptions during high-risk tasks."
  },
    // =========================================================
  // DIFFERENTIAL MODE
  // =========================================================

  // CARDIOLOGY — DIFFERENTIAL
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Older patient has exertional dyspnea, angina, syncope, and a harsh systolic murmur radiating to the carotids.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral regurgitation", "Pulmonary embolism"],
    correct: 0,
    explanation: "This favors aortic stenosis over hypertrophic cardiomyopathy because the patient is older and the murmur radiates to the carotids."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Young athlete has exertional near-syncope, family history of sudden death, and a systolic murmur that increases with standing.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral valve prolapse", "Dilated cardiomyopathy"],
    correct: 1,
    explanation: "This favors hypertrophic cardiomyopathy over aortic stenosis because the patient is young, has sudden-death family history, and murmur worsens with decreased preload."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient with prior MI has orthopnea, leg edema, bibasilar crackles, and an S3 gallop.",
    answers: ["Heart failure exacerbation", "COPD exacerbation", "Pneumonia", "Pulmonary embolism"],
    correct: 0,
    explanation: "This favors heart failure over COPD or pneumonia because orthopnea, edema, crackles, and S3 indicate volume overload."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient with chest pressure now has pain at rest and new ST depressions, but no ST elevations.",
    answers: ["Stable angina", "Acute coronary syndrome", "Pericarditis", "Aortic dissection"],
    correct: 1,
    explanation: "This favors ACS over stable angina because pain occurs at rest and ECG shows new ischemic changes."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient with crushing chest pain has ST elevations in II, III, and aVF.",
    answers: ["Anterior MI", "Inferior MI", "Lateral MI", "Posterior MI"],
    correct: 1,
    explanation: "This favors inferior MI because leads II, III, and aVF represent the inferior wall."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient has abrupt severe chest pain radiating to the back with unequal blood pressures in both arms.",
    answers: ["Acute MI", "Aortic dissection", "Pulmonary embolism", "Pericarditis"],
    correct: 1,
    explanation: "This favors aortic dissection over MI because tearing back-radiating pain with pulse/BP asymmetry is classic for dissection."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient has sharp pleuritic chest pain after viral illness that improves sitting forward and worsens lying flat.",
    answers: ["Pericarditis", "Acute MI", "Pulmonary embolism", "GERD"],
    correct: 0,
    explanation: "This favors pericarditis because positional pleuritic pain after viral illness is classic."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient with atrial fibrillation has hypotension, confusion, and pulmonary edema.",
    answers: ["Oral anticoagulation", "IV beta-blocker only", "Immediate synchronized cardioversion", "Outpatient follow-up"],
    correct: 2,
    explanation: "This favors synchronized cardioversion over rate control because atrial fibrillation is hemodynamically unstable."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Trauma patient has hypotension, JVD, muffled heart sounds, and equal breath sounds.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Acute MI", "Massive pulmonary embolism"],
    correct: 0,
    explanation: "This favors tamponade over tension pneumothorax because breath sounds are equal and Beck triad is present."
  },
  {
    topic: "Cardiology",
    mode: "Differential",
    vignette: "Patient has sudden pleuritic chest pain, dyspnea, tachycardia, hypoxemia, and recent prolonged immobility.",
    answers: ["Acute coronary syndrome", "Pulmonary embolism", "Pneumonia", "Pericarditis"],
    correct: 1,
    explanation: "This favors pulmonary embolism because pleuritic dyspnea plus tachycardia, hypoxemia, and immobility is the key cluster."
  },

  // PULMONOLOGY — DIFFERENTIAL
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient has unilateral pleuritic chest pain, decreased breath sounds, hyperresonance, and stable blood pressure.",
    answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"],
    correct: 2,
    explanation: "This favors simple pneumothorax over tension pneumothorax because there is no shock or tracheal deviation."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Young adult has cough, dyspnea, erythema nodosum, and bilateral hilar lymphadenopathy.",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Goodpasture syndrome"],
    correct: 0,
    explanation: "This favors sarcoidosis because erythema nodosum with bilateral hilar lymphadenopathy is classic."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient has chronic cough, night sweats, weight loss, hemoptysis, and upper-lobe cavitary lesion.",
    answers: ["Sarcoidosis", "Community-acquired pneumonia", "Tuberculosis", "Pulmonary edema"],
    correct: 2,
    explanation: "This favors tuberculosis over acute pneumonia because symptoms are chronic with constitutional signs and upper-lobe cavitation."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient with heart disease has acute dyspnea, orthopnea, pink frothy sputum, and diffuse crackles.",
    answers: ["COPD exacerbation", "Cardiogenic pulmonary edema", "Pneumonia", "Spontaneous pneumothorax"],
    correct: 1,
    explanation: "This favors cardiogenic pulmonary edema because orthopnea, pink frothy sputum, and diffuse crackles suggest left-sided heart failure."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Young patient has episodic wheezing, cough, nighttime symptoms, and improvement after albuterol.",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Pulmonary embolism"],
    correct: 0,
    explanation: "This favors asthma over COPD because symptoms are episodic, nocturnal, and bronchodilator-responsive in a young patient."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient with leg immobilization has acute pleuritic chest pain, dyspnea, tachycardia, and hypoxemia.",
    answers: ["Pneumonia", "Acute coronary syndrome", "Pulmonary embolism", "Pericarditis"],
    correct: 2,
    explanation: "This favors pulmonary embolism because immobilization plus acute pleuritic dyspnea and hypoxemia is the key pattern."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient with bird exposure has cough, dyspnea, fatigue, and interstitial lung findings that worsen after exposure.",
    answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"],
    correct: 2,
    explanation: "This favors hypersensitivity pneumonitis because symptoms are temporally linked to organic antigen exposure."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Septic patient develops severe hypoxemia and bilateral infiltrates without evidence of cardiac failure.",
    answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Cardiogenic pulmonary edema"],
    correct: 1,
    explanation: "This favors ARDS over cardiogenic edema because bilateral infiltrates follow an inflammatory trigger without volume overload or heart failure."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Long-term smoker has chronic cough, weight loss, and irregular spiculated upper-lobe lung nodule.",
    answers: ["Benign granuloma", "Viral infection", "Lung cancer", "Pulmonary abscess"],
    correct: 2,
    explanation: "This favors lung cancer because smoking, weight loss, and spiculated nodule are malignant red flags."
  },
  {
    topic: "Pulmonology",
    mode: "Differential",
    vignette: "Patient with COPD has acute worsening dyspnea, wheeze, cough, and increased sputum without focal consolidation.",
    answers: ["COPD exacerbation", "Pulmonary embolism", "Acute heart failure", "Pneumothorax"],
    correct: 0,
    explanation: "This favors COPD exacerbation because symptoms are airway-centered with wheeze and sputum increase."
  },

  // NEPHROLOGY — DIFFERENTIAL
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Septic ICU patient develops AKI and urine microscopy shows muddy brown granular casts.",
    answers: ["Diabetic nephropathy", "Poststreptococcal glomerulonephritis", "Acute tubular necrosis", "Lupus nephritis"],
    correct: 2,
    explanation: "This favors acute tubular necrosis because ischemic/septic injury plus muddy brown casts is classic."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient develops gross hematuria 2 days after a sore throat with normal complement levels.",
    answers: ["IgA nephropathy", "Poststreptococcal glomerulonephritis", "Membranoproliferative glomerulonephritis", "Minimal change disease"],
    correct: 0,
    explanation: "This favors IgA nephropathy over PSGN because hematuria occurs within days, not weeks, and complement is normal."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Long-standing diabetic patient develops gradual kidney dysfunction and heavy proteinuria.",
    answers: ["Minimal change disease", "FSGS", "Diabetic nephropathy", "Membranous nephropathy"],
    correct: 2,
    explanation: "This favors diabetic nephropathy because kidney disease and proteinuria develop gradually after years of diabetes."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Renal failure patient has potassium 7.0 mEq/L with peaked T waves and QRS widening.",
    answers: ["IV calcium gluconate", "Loop diuretic only", "Oral potassium binder only", "Fluid restriction"],
    correct: 0,
    explanation: "This favors IV calcium because ECG changes mean immediate membrane stabilization is needed before potassium-lowering measures."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient has bilateral enlarged cystic kidneys, recurrent hematuria, and family history of dialysis.",
    answers: ["Pyelonephritis", "Autosomal dominant polycystic kidney disease", "Renal infarction", "Renal cell carcinoma"],
    correct: 1,
    explanation: "This favors ADPKD because bilateral cystic kidneys with family history is inherited polycystic disease."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Euvolemic patient has hyponatremia with inappropriately concentrated urine and elevated urine sodium.",
    answers: ["Hypovolemic hyponatremia", "SIADH", "Diabetes insipidus", "Primary polydipsia"],
    correct: 1,
    explanation: "This favors SIADH because the urine should be dilute in hyponatremia but remains concentrated."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient with decades of hypertension has slowly progressive CKD, mild proteinuria, and bland urine sediment.",
    answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"],
    correct: 1,
    explanation: "This favors hypertensive nephrosclerosis because long-standing hypertension causes gradual CKD with mild proteinuria and bland sediment."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient has fever, urinary symptoms, flank pain, nausea, and CVA tenderness.",
    answers: ["Cystitis", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"],
    correct: 2,
    explanation: "This favors pyelonephritis over cystitis because systemic symptoms and CVA tenderness indicate upper urinary tract infection."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient has generalized edema and heavy proteinuria without red blood cell casts.",
    answers: ["Nephritic syndrome", "Nephrotic syndrome", "Acute tubular necrosis", "Postrenal obstruction"],
    correct: 1,
    explanation: "This favors nephrotic syndrome because heavy proteinuria and edema dominate without active inflammatory sediment."
  },
  {
    topic: "Nephrology",
    mode: "Differential",
    vignette: "Patient has colicky flank pain radiating to the groin with nausea and microscopic hematuria.",
    answers: ["Pyelonephritis", "Ureteral stone", "Renal cell carcinoma", "Glomerulonephritis"],
    correct: 1,
    explanation: "This favors ureteral stone because colicky flank-to-groin pain with hematuria is classic."
  },

  // GASTROENTEROLOGY/HEPATOLOGY — DIFFERENTIAL
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has postprandial burning chest discomfort, sour taste, and worse symptoms when lying down.",
    answers: ["Peptic ulcer disease", "GERD", "Gastric cancer", "Acute pancreatitis"],
    correct: 1,
    explanation: "This favors GERD because regurgitation and supine worsening are classic reflux features."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient with cirrhosis suddenly has massive hematemesis and hypotension.",
    answers: ["Peptic ulcer bleeding", "Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia"],
    correct: 1,
    explanation: "This favors variceal bleeding because portal hypertension from cirrhosis predisposes to massive upper GI bleeding."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has persistent RUQ pain after a fatty meal, fever, and Murphy sign.",
    answers: ["Biliary colic", "Acute cholecystitis", "Acute pancreatitis", "Viral hepatitis"],
    correct: 1,
    explanation: "This favors acute cholecystitis over biliary colic because pain persists and fever/inflammation are present."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has severe epigastric pain radiating to the back after heavy alcohol use with repeated vomiting.",
    answers: ["GERD", "Acute pancreatitis", "Acute MI", "Peptic ulcer disease"],
    correct: 1,
    explanation: "This favors acute pancreatitis because pain is epigastric, back-radiating, and alcohol-associated."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has chronic diarrhea, bloating, weight loss, and iron deficiency that improve when avoiding wheat.",
    answers: ["Crohn disease", "Celiac disease", "IBS", "Lactose intolerance"],
    correct: 1,
    explanation: "This favors celiac disease because malabsorption plus iron deficiency and gluten association are key."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient develops watery diarrhea and abdominal cramping after recent antibiotic use.",
    answers: ["Viral gastroenteritis", "C difficile infection", "Salmonella gastroenteritis", "Crohn disease"],
    correct: 1,
    explanation: "This favors C difficile because antibiotic exposure is the defining risk factor."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient with chronic hepatitis C has ascites, jaundice, bruising, edema, and spider angiomas.",
    answers: ["Acute hepatitis", "Decompensated cirrhosis", "Acute cholangitis", "Pancreatic cancer"],
    correct: 1,
    explanation: "This favors decompensated cirrhosis because chronic liver disease now has ascites, coagulopathy signs, jaundice, and edema."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has fever and steady LLQ abdominal pain with sigmoid inflammation on CT.",
    answers: ["Appendicitis", "Diverticulitis", "Ulcerative colitis", "Ischemic colitis"],
    correct: 1,
    explanation: "This favors diverticulitis because LLQ pain with focal sigmoid inflammation is classic."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has years of abdominal discomfort with alternating bowel habits, relief after bowel movements, and no alarm features.",
    answers: ["Crohn disease", "Ulcerative colitis", "Irritable bowel syndrome", "Celiac disease"],
    correct: 2,
    explanation: "This favors IBS because symptoms are chronic, bowel-habit related, and lack inflammatory/alarm features."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Differential",
    vignette: "Patient has progressive dysphagia beginning with solids and later involving liquids, plus weight loss.",
    answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"],
    correct: 2,
    explanation: "This favors esophageal cancer because progressive dysphagia with weight loss is a red-flag obstructive pattern."
  },

  // ENDOCRINOLOGY — DIFFERENTIAL
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Young patient has hyperglycemia, abdominal pain, vomiting, dehydration, and deep rapid breathing.",
    answers: ["Type 2 diabetes", "Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Hypoglycemia"],
    correct: 1,
    explanation: "This favors DKA because ketosis/acidosis symptoms produce vomiting, abdominal pain, dehydration, and Kussmaul respirations."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Older patient with type 2 diabetes has extreme hyperglycemia, severe dehydration, confusion, high osmolality, and minimal ketosis.",
    answers: ["Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Lactic acidosis", "Hypoglycemia"],
    correct: 1,
    explanation: "This favors HHS over DKA because hyperosmolality and dehydration dominate with minimal ketosis."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has weight loss despite increased appetite, tremor, heat intolerance, palpitations, and goiter.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroid cancer", "Central hypothyroidism"],
    correct: 1,
    explanation: "This favors hyperthyroidism because sympathetic symptoms and weight loss with increased appetite are classic."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has fatigue, weight gain, constipation, cold intolerance, dry skin, and bradycardia.",
    answers: ["Hyperthyroidism", "Hypothyroidism", "Adrenal insufficiency", "Cushing syndrome"],
    correct: 1,
    explanation: "This favors hypothyroidism because slowed metabolism causes cold intolerance, constipation, weight gain, dry skin, and bradycardia."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has resistant hypertension, hypokalemia, and metabolic alkalosis without diuretic use.",
    answers: ["Primary hyperaldosteronism", "Pheochromocytoma", "Addison disease", "SIADH"],
    correct: 0,
    explanation: "This favors primary hyperaldosteronism because aldosterone excess causes sodium retention, potassium loss, hypertension, and alkalosis."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has central obesity, facial rounding, easy bruising, proximal weakness, hypertension, and purple striae.",
    answers: ["Adrenal insufficiency", "Cushing syndrome", "Hypothyroidism", "PCOS"],
    correct: 1,
    explanation: "This favors Cushing syndrome because cortisol excess causes central weight gain with catabolic skin and muscle findings."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has irregular menses, acne, hirsutism, infertility, and weight gain.",
    answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"],
    correct: 1,
    explanation: "This favors PCOS because chronic oligo-ovulation plus hyperandrogenic features is the key pattern."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Patient has recurrent kidney stones, constipation, fatigue, bone pain, elevated calcium, and high PTH.",
    answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide effect"],
    correct: 2,
    explanation: "This favors primary hyperparathyroidism because hypercalcemia with elevated PTH is PTH-mediated disease."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Postmenopausal patient has a low-trauma wrist fracture and reduced bone density.",
    answers: ["Normal aging", "Osteopenia", "Osteoporosis", "Osteomalacia"],
    correct: 2,
    explanation: "This favors osteoporosis because a fragility fracture establishes clinically significant bone weakness."
  },
  {
    topic: "Endocrinology",
    mode: "Differential",
    vignette: "Nondiabetic patient has fasting episodes of sweating, tremor, confusion, and symptoms resolving after food.",
    answers: ["Factitious insulin use", "Insulinoma", "Panic disorder", "Adrenal insufficiency"],
    correct: 1,
    explanation: "This favors insulinoma because fasting hypoglycemia with neuroglycopenic symptoms relieved by food is the classic pattern."
  },

  // HEMATOLOGY/ONCOLOGY — DIFFERENTIAL
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has microcytic anemia, fatigue, pale conjunctiva, heavy menstrual bleeding, and low ferritin.",
    answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia trait"],
    correct: 1,
    explanation: "This favors iron deficiency anemia because chronic blood loss with low ferritin causes microcytosis."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has macrocytic anemia, glossitis, numb feet, gait instability, and impaired vibration sense.",
    answers: ["Folate deficiency", "Vitamin B12 deficiency", "Hypothyroidism", "Reticulocytosis"],
    correct: 1,
    explanation: "This favors vitamin B12 deficiency over folate deficiency because neurologic deficits are present."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has jaundice, dark urine, anemia, reticulocytosis, and splenomegaly after recent illness.",
    answers: ["Iron deficiency anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolytic anemia"],
    correct: 3,
    explanation: "This favors autoimmune hemolytic anemia because acute hemolysis with splenomegaly after illness is typical."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Child has recurrent bone pain crises, anemia, jaundice, and infections with encapsulated organisms.",
    answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"],
    correct: 2,
    explanation: "This favors sickle cell disease because vaso-occlusion and functional asplenia explain pain crises and encapsulated infections."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has fatigue, infections, bruising, and pancytopenia.",
    answers: ["ITP", "TTP", "DIC", "Aplastic anemia"],
    correct: 3,
    explanation: "This favors aplastic anemia because all three cell lines are low, not just platelets or clotting factors."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has fever, confusion, kidney injury, thrombocytopenia, and schistocytes with near-normal coagulation studies.",
    answers: ["ITP", "DIC", "TTP", "Hemophilia A"],
    correct: 2,
    explanation: "This favors TTP over DIC because MAHA plus neuro/renal findings with relatively normal coagulation studies is classic."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient has fatigue, recurrent infections, gum bleeding, anemia, thrombocytopenia, and many immature cells on smear.",
    answers: ["Chronic myeloid leukemia", "Acute leukemia", "Leukemoid reaction", "Chronic lymphocytic leukemia"],
    correct: 1,
    explanation: "This favors acute leukemia because blasts/immature cells cause marrow failure with infection, bleeding, and anemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Older patient has back pain, fatigue, recurrent infections, renal dysfunction, high total protein, and lytic bone lesions.",
    answers: ["Waldenström macroglobulinemia", "Multiple myeloma", "Hodgkin lymphoma", "CLL"],
    correct: 1,
    explanation: "This favors multiple myeloma because CRAB features and lytic lesions are classic plasma cell disease findings."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Patient on warfarin has INR 9.2 but no active bleeding and stable vital signs.",
    answers: ["Fresh frozen plasma", "Vitamin K and hold warfarin", "Platelet transfusion", "Protamine"],
    correct: 1,
    explanation: "This favors vitamin K and holding warfarin because there is very high INR without life-threatening bleeding."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Differential",
    vignette: "Young adult has painless cervical lymphadenopathy, fever, night sweats, weight loss, and pruritus.",
    answers: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Tuberculosis", "Reactive lymphadenopathy"],
    correct: 1,
    explanation: "This favors Hodgkin lymphoma because young adult painless lymphadenopathy with B symptoms and pruritus is classic."
  },

  // INFECTIOUS DISEASE — DIFFERENTIAL
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient with pneumonia has persistent hypotension despite fluids, confusion, poor perfusion, and elevated lactate.",
    answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"],
    correct: 0,
    explanation: "This favors septic shock because infection plus persistent hypotension and organ dysfunction define the syndrome."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient has acute fever, severe headache, neck stiffness, confusion, photophobia, and petechial rash.",
    answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"],
    correct: 1,
    explanation: "This favors bacterial meningitis because confusion and petechial rash indicate severe acute bacterial disease."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient has fever, personality change, confusion, focal seizures, and temporal lobe abnormalities.",
    answers: ["Bacterial meningitis", "Viral meningitis", "Herpes encephalitis", "Fungal meningitis"],
    correct: 2,
    explanation: "This favors HSV encephalitis because fever with altered behavior, focal seizures, and temporal lobe involvement is classic."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient with prosthetic valve has persistent fever, new murmur, painful finger nodules, and embolic skin lesions.",
    answers: ["Infective endocarditis", "Pericarditis", "Myocarditis", "Pneumonia"],
    correct: 0,
    explanation: "This favors infective endocarditis because fever plus new murmur and embolic/immunologic lesions indicate valve infection."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Stable patient has nonbloody watery diarrhea after undercooked poultry exposure, without immunocompromise.",
    answers: ["Immediate antibiotics", "Supportive care", "Urgent surgery", "Antitoxin"],
    correct: 1,
    explanation: "This favors supportive care because uncomplicated noninvasive foodborne diarrhea usually does not require antibiotics."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Unvaccinated child has high fever, cough, coryza, conjunctivitis, and face-first spreading rash.",
    answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"],
    correct: 1,
    explanation: "This favors measles because the cough-coryza-conjunctivitis triad with cephalocaudal rash is classic."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient has painful genital ulcer with ragged borders and tender inguinal lymphadenopathy.",
    answers: ["Genital herpes", "Syphilis", "Chancroid", "Granuloma inguinale"],
    correct: 2,
    explanation: "This favors chancroid over syphilis because the ulcer is painful and lymph nodes are tender."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient with advanced HIV has dry cough, progressive dyspnea, hypoxemia, and diffuse bilateral hazy infiltrates.",
    answers: ["Bacterial pneumonia", "Tuberculosis", "Pneumocystis pneumonia", "CMV pneumonitis"],
    correct: 2,
    explanation: "This favors Pneumocystis pneumonia because advanced HIV with dry cough, hypoxemia, and diffuse bilateral infiltrates is classic."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Patient develops jaundice, fatigue, dark urine, and RUQ discomfort several weeks after needlestick injury.",
    answers: ["Chronic hepatitis B", "Acute hepatitis B", "Resolved hepatitis B", "Hepatitis B immunity"],
    correct: 1,
    explanation: "This favors acute hepatitis B because symptomatic hepatitis appears weeks after blood exposure."
  },
  {
    topic: "Infectious Disease",
    mode: "Differential",
    vignette: "Traveler from West Africa has recurrent fevers, shaking chills, sweats, jaundice, and anemia.",
    answers: ["Dengue", "Typhoid fever", "Malaria", "Leptospirosis"],
    correct: 2,
    explanation: "This favors malaria because cyclic fevers with chills, anemia, jaundice, and endemic travel are classic."
  },

  // NEUROLOGY — DIFFERENTIAL
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has sudden persistent focal weakness and aphasia that began 2 hours ago, with normal glucose.",
    answers: ["TIA", "Hemorrhagic stroke", "Acute ischemic stroke", "Todd paralysis"],
    correct: 2,
    explanation: "This favors acute ischemic stroke because focal deficits are sudden and persistent within the acute treatment window."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has abrupt worst headache of life with vomiting, photophobia, and neck stiffness.",
    answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Cluster headache"],
    correct: 2,
    explanation: "This favors subarachnoid hemorrhage because thunderclap onset with meningismus is the key distinction from migraine."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Child has a generalized convulsion lasting more than 5 minutes.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Syncope"],
    correct: 1,
    explanation: "This favors status epilepticus because any seizure lasting more than 5 minutes is treated as ongoing seizure emergency."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has unilateral facial weakness involving the forehead, eye closure, and mouth, without limb symptoms.",
    answers: ["Stroke", "Bell palsy", "Trigeminal neuralgia", "Myasthenia gravis"],
    correct: 1,
    explanation: "This favors Bell palsy because forehead involvement indicates a peripheral facial nerve palsy rather than typical cortical stroke."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has ascending weakness over days after diarrhea with absent reflexes.",
    answers: ["Transverse myelitis", "Guillain-Barré syndrome", "ALS", "Spinal cord compression"],
    correct: 1,
    explanation: "This favors Guillain-Barré syndrome because postinfectious ascending weakness with areflexia is classic."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has gradual memory-predominant decline, impaired finances/navigation, and loss of daily function.",
    answers: ["Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Alzheimer disease"],
    correct: 3,
    explanation: "This favors Alzheimer disease because memory-predominant, slowly progressive functional decline is classic."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has fatigable ptosis, diplopia, and weakness that worsens with repeated use and improves with rest.",
    answers: ["Myasthenia gravis", "Lambert-Eaton syndrome", "Polymyositis", "Thyroid eye disease"],
    correct: 0,
    explanation: "This favors myasthenia gravis because fluctuating fatigable ocular weakness is the key pattern."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has rest tremor, bradykinesia, rigidity, small handwriting, and shuffling gait.",
    answers: ["Essential tremor", "Parkinson disease", "Cerebellar ataxia", "Dystonia"],
    correct: 1,
    explanation: "This favors Parkinson disease over essential tremor because tremor occurs at rest with bradykinesia and rigidity."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Young adult has neurologic episodes months apart involving vision, sensation, and balance, each partially resolving.",
    answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"],
    correct: 2,
    explanation: "This favors multiple sclerosis because deficits are separated in time and space."
  },
  {
    topic: "Neurology",
    mode: "Differential",
    vignette: "Patient has recurrent vertigo lasting hours with unilateral tinnitus, ear fullness, and fluctuating hearing loss.",
    answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"],
    correct: 2,
    explanation: "This favors Ménière disease because vertigo episodes are accompanied by unilateral auditory symptoms."
  },

  // PSYCHIATRY — DIFFERENTIAL
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has low mood, anhedonia, insomnia, guilt, low energy, poor concentration, and thoughts of death for 3 weeks.",
    answers: ["Adjustment disorder", "Major depressive disorder", "Persistent depressive disorder", "Bipolar disorder"],
    correct: 1,
    explanation: "This favors major depressive disorder because multiple depressive symptoms persist for more than 2 weeks with impairment."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has decreased need for sleep, pressured speech, grandiosity, risky spending, and hospitalization for unsafe behavior.",
    answers: ["ADHD", "Mania", "Generalized anxiety disorder", "Hypomania"],
    correct: 1,
    explanation: "This favors mania over hypomania because hospitalization and marked impairment are present."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has excessive worry about multiple domains on most days for months with sleep difficulty and muscle tension.",
    answers: ["Social anxiety disorder", "Generalized anxiety disorder", "Panic disorder", "Specific phobia"],
    correct: 1,
    explanation: "This favors GAD because worry is chronic and spread across multiple domains."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has recurrent unexpected panic attacks and persistent worry about having another attack.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "Panic disorder", "Social anxiety disorder"],
    correct: 2,
    explanation: "This favors panic disorder because attacks are recurrent and followed by anticipatory anxiety."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has nightmares, intrusive memories, avoidance, irritability, and hypervigilance several months after trauma.",
    answers: ["Adjustment disorder", "PTSD", "Acute stress disorder", "Generalized anxiety disorder"],
    correct: 1,
    explanation: "This favors PTSD over acute stress disorder because symptoms persist for more than 1 month after trauma."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has intrusive contamination fears and repetitive handwashing despite recognizing the behavior is excessive.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "OCD", "Body dysmorphic disorder"],
    correct: 2,
    explanation: "This favors OCD because obsessions are relieved by compulsions and insight is often preserved."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has months of hallucinations, fixed delusions, disorganized speech, social withdrawal, and functional decline.",
    answers: ["Brief psychotic disorder", "Schizophreniform disorder", "Schizophrenia", "Delusional disorder"],
    correct: 2,
    explanation: "This favors schizophrenia because chronic psychosis is accompanied by functional decline for at least 6 months."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has binge eating, loss of control, vomiting and excessive exercise, but normal BMI.",
    answers: ["Anorexia nervosa", "Bulimia nervosa", "Binge eating disorder", "Avoidant restrictive food intake disorder"],
    correct: 1,
    explanation: "This favors bulimia nervosa because binge eating is followed by compensatory behaviors and BMI is not low."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient with heavy alcohol use stops drinking and develops tremor, sweating, tachycardia, hypertension, and anxiety within hours.",
    answers: ["Wernicke encephalopathy", "Alcohol withdrawal", "Delirium tremens", "Hepatic encephalopathy"],
    correct: 1,
    explanation: "This favors alcohol withdrawal because autonomic hyperactivity and tremor occur within hours after cessation."
  },
  {
    topic: "Psychiatry",
    mode: "Differential",
    vignette: "Patient has an enduring pattern of grandiosity, need for admiration, entitlement, exploitation, and lack of empathy.",
    answers: ["Borderline personality disorder", "Narcissistic personality disorder", "Antisocial personality disorder", "Histrionic personality disorder"],
    correct: 1,
    explanation: "This favors narcissistic personality disorder because grandiosity and need for admiration dominate."
  },

  // RHEUMATOLOGY — DIFFERENTIAL
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has symmetric swelling of wrists and MCP joints with morning stiffness lasting more than an hour.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Systemic lupus erythematosus", "Gout"],
    correct: 1,
    explanation: "This favors rheumatoid arthritis over osteoarthritis because inflammation is symmetric, small-joint, and prolonged in the morning."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has photosensitive rash, oral ulcers, arthralgia, fatigue, and pleuritic chest pain.",
    answers: ["Sjögren syndrome", "Systemic sclerosis", "Systemic lupus erythematosus", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "This favors SLE because photosensitivity, oral ulcers, arthritis, and serositis form a multisystem autoimmune pattern."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has sudden severe red swollen first MTP joint after alcohol and heavy meals.",
    answers: ["Rheumatoid arthritis", "Pseudogout", "Gout", "Septic arthritis"],
    correct: 2,
    explanation: "This favors gout because podagra after alcohol/purine load is classic."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Older patient with osteoarthritis has recurrent sudden painful swelling of one knee.",
    answers: ["Gout", "Pseudogout", "Rheumatoid arthritis", "Polymyalgia rheumatica"],
    correct: 1,
    explanation: "This favors pseudogout because acute knee monoarthritis in an older patient with OA is typical calcium pyrophosphate disease."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Older patient has bilateral shoulder and hip stiffness worse in the morning, but true muscle strength is normal.",
    answers: ["Rheumatoid arthritis", "Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis"],
    correct: 1,
    explanation: "This favors polymyalgia rheumatica over polymyositis because pain/stiffness dominates without true weakness."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Older patient has new temporal headache, scalp tenderness, jaw claudication, and transient vision loss.",
    answers: ["Polymyalgia rheumatica", "Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa"],
    correct: 1,
    explanation: "This favors giant cell arteritis because headache with jaw claudication and visual symptoms in an older patient is classic."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has Raynaud phenomenon, tight shiny finger skin, reflux, and dysphagia.",
    answers: ["SLE", "Sjögren syndrome", "Systemic sclerosis", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "This favors systemic sclerosis because Raynaud, sclerodactyly, and esophageal dysmotility cluster together."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Young man has chronic back pain that is worse with rest, improves with exercise, and causes reduced spinal flexibility.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Ankylosing spondylitis", "Gout"],
    correct: 2,
    explanation: "This favors ankylosing spondylitis because inflammatory back pain improves with activity and reduces spinal mobility."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has persistent dry eyes, dry mouth, dental caries, parotid swelling, and arthralgias.",
    answers: ["SLE", "Rheumatoid arthritis", "Sjögren syndrome", "Systemic sclerosis"],
    correct: 2,
    explanation: "This favors Sjögren syndrome because sicca symptoms with dental disease and parotid swelling are classic."
  },
  {
    topic: "Rheumatology",
    mode: "Differential",
    vignette: "Patient has palpable purpura, hematuria, pulmonary hemorrhage, and worsening kidney function.",
    answers: ["Polyarteritis nodosa", "Microscopic polyangiitis", "Granulomatosis with polyangiitis", "Takayasu arteritis"],
    correct: 1,
    explanation: "This favors microscopic polyangiitis because small-vessel vasculitis can involve skin, kidneys, and lungs."
  },
    // OB/GYN — DIFFERENTIAL
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Pregnant patient has unilateral pelvic pain, vaginal bleeding, dizziness, and positive pregnancy test.",
    answers: ["Ectopic pregnancy", "Normal early pregnancy", "Endometriosis", "Pelvic inflammatory disease"],
    correct: 0,
    explanation: "This favors ectopic pregnancy because early pregnancy with unilateral pain and bleeding is ectopic until proven otherwise."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient at 8 weeks gestation has vaginal bleeding, cramping, and an open cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Complete abortion", "Missed abortion"],
    correct: 1,
    explanation: "This favors inevitable abortion over threatened abortion because the cervical os is open."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient at 9 weeks gestation has mild vaginal bleeding, minimal cramping, and a closed cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Septic abortion", "Complete abortion"],
    correct: 0,
    explanation: "This favors threatened abortion because bleeding occurs in early pregnancy but the cervical os remains closed."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient in the third trimester has painless bright red vaginal bleeding with a soft nontender uterus.",
    answers: ["Placenta previa", "Placental abruption", "Uterine rupture", "Preterm labor"],
    correct: 0,
    explanation: "This favors placenta previa over abruption because bleeding is painless and the uterus is nontender."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient in the third trimester has painful vaginal bleeding, uterine tenderness, and frequent contractions.",
    answers: ["Placenta previa", "Placental abruption", "Cervicitis", "Vasa previa"],
    correct: 1,
    explanation: "This favors placental abruption because bleeding is painful and associated with uterine tenderness/contractions."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Pregnant patient has severe-range blood pressure, headache, visual symptoms, and right upper quadrant pain.",
    answers: ["Gestational hypertension", "Preeclampsia with severe features", "Chronic hypertension", "HELLP syndrome only"],
    correct: 1,
    explanation: "This favors preeclampsia with severe features because severe hypertension with neurologic/RUQ symptoms is present."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Pregnant patient has a generalized seizure after headache, visual symptoms, and elevated blood pressure.",
    answers: ["Epilepsy", "Eclampsia", "Syncope", "Panic attack"],
    correct: 1,
    explanation: "This favors eclampsia because seizure occurs in the setting of preeclampsia symptoms."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient at 30 weeks gestation has regular contractions with progressive cervical dilation.",
    answers: ["Braxton Hicks contractions", "Preterm labor", "Placenta previa", "Round ligament pain"],
    correct: 1,
    explanation: "This favors preterm labor because contractions are regular and cause cervical change before 37 weeks."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Postdates pregnancy has decreased fetal movement and recurrent late decelerations on fetal monitoring.",
    answers: ["Reassuring fetal status", "Uteroplacental insufficiency", "Cord compression", "Fetal sleep cycle"],
    correct: 1,
    explanation: "This favors uteroplacental insufficiency because late decelerations reflect impaired placental oxygen delivery."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Labor tracing shows abrupt fetal heart rate decelerations that vary in timing and shape.",
    answers: ["Uteroplacental insufficiency", "Cord compression", "Normal fetal tracing", "Maternal fever"],
    correct: 1,
    explanation: "This favors cord compression because variable decelerations are abrupt and vary in timing/shape."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has heavy postpartum bleeding shortly after delivery with a soft boggy enlarged uterus.",
    answers: ["Uterine atony", "Retained placenta", "Cervical laceration", "Uterine inversion"],
    correct: 0,
    explanation: "This favors uterine atony because postpartum hemorrhage with a boggy uterus is classic."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Postpartum patient has fever, uterine tenderness, and foul-smelling lochia after prolonged labor and cesarean delivery.",
    answers: ["Endometritis", "Mastitis", "Urinary tract infection", "Wound dehiscence"],
    correct: 0,
    explanation: "This favors postpartum endometritis because uterine tenderness and foul lochia localize the infection to the uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Breastfeeding patient has fever and painful wedge-shaped breast erythema without fluctuance.",
    answers: ["Breast abscess", "Mastitis", "Inflammatory breast cancer", "Fibroadenoma"],
    correct: 1,
    explanation: "This favors mastitis over abscess because there is lactational fever and focal erythema without fluctuance."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has fever, pelvic pain, cervical motion tenderness, and mucopurulent cervical discharge.",
    answers: ["Pelvic inflammatory disease", "Ectopic pregnancy", "Endometriosis", "Ovarian torsion"],
    correct: 0,
    explanation: "This favors PID because cervical motion tenderness with fever and mucopurulent discharge indicates ascending infection."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has sudden severe unilateral pelvic pain with nausea/vomiting, negative pregnancy test, and no fever.",
    answers: ["Ovarian torsion", "Pelvic inflammatory disease", "Endometriosis", "Mittelschmerz"],
    correct: 0,
    explanation: "This favors ovarian torsion because pain is sudden, unilateral, severe, and associated with nausea/vomiting."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has chronic cyclic pelvic pain, deep dyspareunia, dysmenorrhea, and infertility.",
    answers: ["Endometriosis", "Adenomyosis", "Pelvic inflammatory disease", "Ovarian torsion"],
    correct: 0,
    explanation: "This favors endometriosis because cyclic pelvic pain with dyspareunia and infertility is classic."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has heavy painful menses and a uniformly enlarged tender uterus.",
    answers: ["Adenomyosis", "Endometriosis", "Leiomyomas", "Endometrial cancer"],
    correct: 0,
    explanation: "This favors adenomyosis because the uterus is diffusely enlarged and tender rather than irregular."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has heavy menstrual bleeding, pelvic pressure, and enlarged irregular uterus.",
    answers: ["Leiomyomas", "Adenomyosis", "Endometriosis", "Endometrial hyperplasia"],
    correct: 0,
    explanation: "This favors leiomyomas because fibroids cause bulk symptoms with an irregular enlarged uterus."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Postmenopausal patient with obesity, hypertension, and diabetes develops vaginal bleeding.",
    answers: ["Endometrial cancer", "Cervical ectropion", "Normal menopause", "Functional ovarian cyst"],
    correct: 0,
    explanation: "This favors endometrial cancer because postmenopausal bleeding with unopposed estrogen risk factors is concerning."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has thin gray malodorous vaginal discharge and vaginal pH greater than 4.5.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Physiologic discharge"],
    correct: 0,
    explanation: "This favors bacterial vaginosis because thin fishy discharge with elevated pH is classic."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has intense vulvar itching, thick white discharge, and normal vaginal pH.",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomoniasis", "Chlamydia cervicitis"],
    correct: 1,
    explanation: "This favors vulvovaginal candidiasis because pruritus, thick white discharge, and normal pH are classic."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has frothy yellow-green discharge, vulvar irritation, and strawberry cervix.",
    answers: ["Trichomoniasis", "Bacterial vaginosis", "Candidiasis", "Atrophic vaginitis"],
    correct: 0,
    explanation: "This favors trichomoniasis because frothy discharge with strawberry cervix is classic."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has irregular menses, acne, hirsutism, infertility, and normal pregnancy/prolactin testing.",
    answers: ["PCOS", "Premature ovarian insufficiency", "Hyperprolactinemia", "Endometriosis"],
    correct: 0,
    explanation: "This favors PCOS because oligo-ovulation plus hyperandrogenism is the core pattern."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has amenorrhea, galactorrhea, headaches, and negative pregnancy test.",
    answers: ["Hyperprolactinemia", "PCOS", "Asherman syndrome", "Primary ovarian insufficiency"],
    correct: 0,
    explanation: "This favors hyperprolactinemia because galactorrhea with amenorrhea is the key clue."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient develops secondary amenorrhea after dilation and curettage for postpartum hemorrhage.",
    answers: ["Asherman syndrome", "PCOS", "Pregnancy", "Endometriosis"],
    correct: 0,
    explanation: "This favors Asherman syndrome because intrauterine adhesions can follow uterine instrumentation."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient has hot flashes, sleep disturbance, vaginal dryness, and 12 months without menses.",
    answers: ["Menopause", "PCOS", "Pregnancy", "Endometrial cancer"],
    correct: 0,
    explanation: "This favors menopause because 12 months of amenorrhea with vasomotor/vaginal symptoms defines the transition."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Adolescent has primary amenorrhea, normal breast development, cyclic pelvic pain, and bulging bluish hymen.",
    answers: ["Imperforate hymen", "Turner syndrome", "Müllerian agenesis", "PCOS"],
    correct: 0,
    explanation: "This favors imperforate hymen because puberty is normal but menstrual outflow is obstructed."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Adolescent has primary amenorrhea, short stature, webbed neck, broad chest, and absent breast development.",
    answers: ["Turner syndrome", "Müllerian agenesis", "Imperforate hymen", "Constitutional delay"],
    correct: 0,
    explanation: "This favors Turner syndrome because short stature and absent puberty suggest gonadal dysgenesis."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient wants highly effective reversible contraception without needing daily adherence.",
    answers: ["Long-acting reversible contraception", "Withdrawal method", "Calendar method", "Spermicide alone"],
    correct: 0,
    explanation: "This favors LARC because it is highly effective, reversible, and does not require daily adherence."
  },
  {
    topic: "OB/GYN",
    mode: "Differential",
    vignette: "Patient with migraine with aura who smokes wants contraception.",
    answers: ["Combined oral contraceptive", "Progestin-only method", "Estrogen patch", "Combined vaginal ring"],
    correct: 1,
    explanation: "This favors a progestin-only method because estrogen is avoided in migraine with aura, especially with smoking."
  },

  // PEDIATRICS — DIFFERENTIAL
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "6-week-old has projectile nonbilious vomiting after feeds, persistent hunger, weight loss, and olive-shaped epigastric mass.",
    answers: ["Pyloric stenosis", "Intussusception", "Malrotation with volvulus", "Gastroesophageal reflux"],
    correct: 0,
    explanation: "This favors pyloric stenosis because vomiting is projectile, nonbilious, and occurs in a hungry young infant with an olive mass."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "8-month-old has episodic severe crying, knees drawn to chest, vomiting, lethargy between episodes, and bloody mucus stool.",
    answers: ["Intussusception", "Pyloric stenosis", "Hirschsprung disease", "Viral gastroenteritis"],
    correct: 0,
    explanation: "This favors intussusception because episodic colicky pain with currant-jelly stool is classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Newborn develops bilious vomiting and abdominal distension shortly after feeding.",
    answers: ["Malrotation with volvulus", "Pyloric stenosis", "Gastroesophageal reflux", "Milk protein allergy"],
    correct: 0,
    explanation: "This favors malrotation with volvulus because bilious vomiting in a newborn is a surgical emergency."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Newborn has delayed meconium passage, abdominal distension, and explosive stool after rectal exam.",
    answers: ["Hirschsprung disease", "Pyloric stenosis", "Intussusception", "Meconium ileus only"],
    correct: 0,
    explanation: "This favors Hirschsprung disease because aganglionosis causes delayed meconium and explosive stool after rectal stimulation."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Toddler has barking cough, hoarseness, inspiratory stridor, nocturnal worsening, and viral prodrome.",
    answers: ["Croup", "Epiglottitis", "Foreign body aspiration", "Bronchiolitis"],
    correct: 0,
    explanation: "This favors croup because barky cough and hoarseness after viral prodrome distinguish it from epiglottitis."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Infant in winter has viral URI followed by cough, wheezing, tachypnea, and poor feeding.",
    answers: ["Bronchiolitis", "Croup", "Asthma", "Epiglottitis"],
    correct: 0,
    explanation: "This favors bronchiolitis because first-time wheezing after URI in an infant is classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Young child has high fever, drooling, muffled voice, tripod positioning, and severe respiratory distress.",
    answers: ["Epiglottitis", "Croup", "Bronchiolitis", "Viral pharyngitis"],
    correct: 0,
    explanation: "This favors epiglottitis because toxic appearance, drooling, muffled voice, and tripod posture indicate supraglottic airway emergency."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Toddler suddenly coughs and wheezes while playing with small toys and has unilateral decreased breath sounds.",
    answers: ["Foreign body aspiration", "Asthma", "Croup", "Bronchiolitis"],
    correct: 0,
    explanation: "This favors foreign body aspiration because onset is abrupt during play and findings are unilateral."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has at least 5 days of fever, conjunctivitis, cracked lips, swollen hands, rash, and cervical lymphadenopathy.",
    answers: ["Kawasaki disease", "Measles", "Scarlet fever", "Juvenile idiopathic arthritis"],
    correct: 0,
    explanation: "This favors Kawasaki disease because prolonged fever with mucocutaneous/extremity findings is classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has fever, migratory joint pain, new murmur, and choreiform movements weeks after untreated sore throat.",
    answers: ["Acute rheumatic fever", "Kawasaki disease", "Juvenile idiopathic arthritis", "Septic arthritis"],
    correct: 0,
    explanation: "This favors acute rheumatic fever because migratory arthritis, carditis, and chorea follow untreated strep pharyngitis."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child refuses to bear weight, has fever, and holds the hip flexed and externally rotated.",
    answers: ["Septic arthritis", "Transient synovitis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease"],
    correct: 0,
    explanation: "This favors septic arthritis because fever plus inability to bear weight suggests infected joint."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "School-aged boy has painless limp, chronic groin pain, and limited hip abduction without fever.",
    answers: ["Legg-Calvé-Perthes disease", "Septic arthritis", "Slipped capital femoral epiphysis", "Transient synovitis"],
    correct: 0,
    explanation: "This favors Legg-Calvé-Perthes disease because painless limp and limited hip motion occur in school-aged children."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Overweight adolescent boy has hip pain referred to the knee and walks with an externally rotated leg.",
    answers: ["Slipped capital femoral epiphysis", "Legg-Calvé-Perthes disease", "Osgood-Schlatter disease", "Septic arthritis"],
    correct: 0,
    explanation: "This favors SCFE because overweight adolescent with hip/knee pain and external rotation is classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Adolescent athlete has anterior knee pain and tibial tubercle tenderness worsened by activity.",
    answers: ["Osgood-Schlatter disease", "Septic arthritis", "Patellar dislocation", "Slipped capital femoral epiphysis"],
    correct: 0,
    explanation: "This favors Osgood-Schlatter disease because tibial tubercle apophysitis causes activity-related anterior knee pain."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Toddler has bruises in different stages of healing and a spiral fracture inconsistent with the history.",
    answers: ["Nonaccidental trauma", "Osteogenesis imperfecta", "Normal toddler injuries", "Vitamin D deficiency"],
    correct: 0,
    explanation: "This favors nonaccidental trauma because injuries are inconsistent with the history and at different healing stages."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Toddler has brief generalized seizure with fever and rapid return to baseline.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Infantile spasms"],
    correct: 0,
    explanation: "This favors simple febrile seizure because it is brief, generalized, fever-associated, and followed by rapid recovery."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Infant has clusters of brief flexion spasms after waking and developmental regression.",
    answers: ["Infantile spasms", "Absence seizures", "Simple febrile seizure", "Breath-holding spells"],
    correct: 0,
    explanation: "This favors infantile spasms because clustered spasms with developmental regression in infancy are classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "School-aged child has frequent brief staring spells with eyelid fluttering and immediate return to activity.",
    answers: ["Absence seizures", "Focal impaired awareness seizures", "Syncope", "ADHD"],
    correct: 0,
    explanation: "This favors absence seizures because episodes are brief, frequent, and have immediate return to baseline."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has polyuria, polydipsia, weight loss, vomiting, dehydration, and deep rapid breathing.",
    answers: ["Diabetic ketoacidosis", "Type 2 diabetes", "Gastroenteritis", "Diabetes insipidus"],
    correct: 0,
    explanation: "This favors DKA because hyperglycemic symptoms plus vomiting and Kussmaul respirations indicate ketoacidosis."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has cola-colored urine, edema, hypertension, and recent throat infection.",
    answers: ["Poststreptococcal glomerulonephritis", "Minimal change disease", "IgA nephropathy", "Nephrolithiasis"],
    correct: 0,
    explanation: "This favors PSGN because nephritic syndrome follows recent streptococcal infection."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has periorbital edema, heavy proteinuria, normal blood pressure, and no red blood cell casts after viral illness.",
    answers: ["Minimal change disease", "Poststreptococcal glomerulonephritis", "IgA nephropathy", "Henoch-Schönlein purpura"],
    correct: 0,
    explanation: "This favors minimal change disease because childhood nephrotic syndrome presents with edema and heavy proteinuria without active sediment."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has palpable purpura on legs, abdominal pain, joint pain, hematuria, and normal platelet count.",
    answers: ["IgA vasculitis", "ITP", "Meningococcemia", "Kawasaki disease"],
    correct: 0,
    explanation: "This favors IgA vasculitis because purpura with abdominal, joint, and renal involvement plus normal platelets is classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Infant has jaundice, poor feeding, vomiting, hepatomegaly, and cataracts after milk feeds.",
    answers: ["Galactosemia", "Physiologic jaundice", "Breast milk jaundice", "Biliary atresia"],
    correct: 0,
    explanation: "This favors galactosemia because milk exposure triggers liver dysfunction, vomiting, poor feeding, and cataracts."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Infant has persistent jaundice, pale stools, dark urine, and hepatomegaly.",
    answers: ["Biliary atresia", "Breast milk jaundice", "Physiologic jaundice", "Gilbert syndrome"],
    correct: 0,
    explanation: "This favors biliary atresia because conjugated jaundice causes pale stools, dark urine, and hepatomegaly."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Toddler has developmental regression, poor eye contact, repetitive movements, and impaired social engagement.",
    answers: ["Autism spectrum disorder", "Normal development", "ADHD", "Oppositional defiant disorder"],
    correct: 0,
    explanation: "This favors autism spectrum disorder because social communication impairment plus restricted/repetitive behaviors is the defining pattern."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Child has inattention, impulsivity, and hyperactivity across home and school for more than 6 months.",
    answers: ["ADHD", "Autism spectrum disorder", "Normal behavior", "Specific learning disorder"],
    correct: 0,
    explanation: "This favors ADHD because symptoms are persistent and present in multiple settings."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Newborn has cyanosis that worsens with feeding and improves with crying.",
    answers: ["Choanal atresia", "Tetralogy of Fallot", "Transient tachypnea", "Laryngomalacia"],
    correct: 0,
    explanation: "This favors choanal atresia because newborns are obligate nasal breathers, so obstruction worsens during feeding and improves with crying."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Infant has recurrent cyanotic spells relieved by squatting/knee-chest position and a harsh systolic murmur.",
    answers: ["Tetralogy of Fallot", "Ventricular septal defect", "Patent ductus arteriosus", "Atrial septal defect"],
    correct: 0,
    explanation: "This favors tetralogy of Fallot because cyanotic spells relieved by squatting are classic."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Premature infant has respiratory distress shortly after birth with grunting, nasal flaring, and diffuse atelectasis.",
    answers: ["Neonatal respiratory distress syndrome", "Transient tachypnea of newborn", "Meconium aspiration", "Choanal atresia"],
    correct: 0,
    explanation: "This favors neonatal respiratory distress syndrome because prematurity causes surfactant deficiency and atelectasis."
  },
  {
    topic: "Pediatrics",
    mode: "Differential",
    vignette: "Term infant delivered by cesarean has mild tachypnea shortly after birth that improves over 24 hours.",
    answers: ["Transient tachypnea of newborn", "Neonatal respiratory distress syndrome", "Meconium aspiration", "Pneumonia"],
    correct: 0,
    explanation: "This favors transient tachypnea of the newborn because retained fetal lung fluid causes mild self-limited tachypnea after cesarean delivery."
  },
    // SURGERY / EMERGENCY — DIFFERENTIAL
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has periumbilical pain that migrates to the right lower quadrant with anorexia, nausea, and McBurney point tenderness.",
    answers: ["Appendicitis", "Gastroenteritis", "Diverticulitis", "Renal colic"],
    correct: 0,
    explanation: "This favors appendicitis because migratory periumbilical-to-RLQ pain with anorexia and focal RLQ tenderness is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has persistent RUQ pain after a fatty meal with fever, nausea, and Murphy sign.",
    answers: ["Acute cholecystitis", "Biliary colic", "Acute pancreatitis", "Appendicitis"],
    correct: 0,
    explanation: "This favors acute cholecystitis over biliary colic because pain is persistent and inflammatory signs are present."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has severe epigastric pain radiating to the back with repeated vomiting after heavy alcohol use.",
    answers: ["Acute pancreatitis", "Perforated ulcer", "GERD", "Bowel obstruction"],
    correct: 0,
    explanation: "This favors acute pancreatitis because alcohol-associated epigastric pain radiating to the back is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has sudden severe abdominal pain, rigid abdomen, and free air under the diaphragm.",
    answers: ["Perforated viscus", "Small bowel obstruction", "Appendicitis", "Diverticulitis"],
    correct: 0,
    explanation: "This favors perforated viscus because peritonitis plus free intraperitoneal air is diagnostic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient with prior abdominal surgery has crampy abdominal pain, vomiting, distension, obstipation, and high-pitched bowel sounds.",
    answers: ["Small bowel obstruction", "Gastroenteritis", "Mesenteric ischemia", "Pancreatitis"],
    correct: 0,
    explanation: "This favors small bowel obstruction because adhesions after prior surgery cause crampy pain, vomiting, distension, and obstipation."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient with atrial fibrillation has sudden severe abdominal pain out of proportion to exam and bloody stool.",
    answers: ["Mesenteric ischemia", "Appendicitis", "Gastroenteritis", "Diverticulitis"],
    correct: 0,
    explanation: "This favors mesenteric ischemia because embolic risk plus pain out of proportion is the key distinction."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Older smoker has sudden abdominal/back pain, hypotension, and pulsatile abdominal mass.",
    answers: ["Ruptured abdominal aortic aneurysm", "Renal colic", "Pancreatitis", "Aortic stenosis"],
    correct: 0,
    explanation: "This favors ruptured AAA because older smoker with abdominal/back pain, shock, and pulsatile mass is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has sudden painful cold pale leg with absent pulses and numbness.",
    answers: ["Acute limb ischemia", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "This favors acute limb ischemia because abrupt pain, pallor, pulselessness, coldness, and neurologic symptoms indicate arterial occlusion."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has sudden severe testicular pain, nausea, high-riding testis, and absent cremasteric reflex.",
    answers: ["Testicular torsion", "Epididymitis", "Inguinal hernia", "Hydrocele"],
    correct: 0,
    explanation: "This favors testicular torsion because sudden severe pain with high-riding testis and absent cremasteric reflex is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has colicky flank pain radiating to the groin, nausea, pacing/restlessness, and hematuria.",
    answers: ["Ureteral stone", "Pyelonephritis", "Appendicitis", "Testicular torsion"],
    correct: 0,
    explanation: "This favors ureteral stone because colicky flank-to-groin pain with hematuria and restlessness is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient after tibial fracture has escalating pain, tense compartments, and severe pain with passive stretch.",
    answers: ["Compartment syndrome", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "This favors compartment syndrome because pain out of proportion and pain with passive stretch after fracture are early key findings."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has rapidly spreading soft tissue infection, systemic toxicity, crepitus, and pain out of proportion.",
    answers: ["Necrotizing fasciitis", "Cellulitis", "Deep vein thrombosis", "Erysipelas"],
    correct: 0,
    explanation: "This favors necrotizing fasciitis because pain out of proportion with rapid progression and toxicity distinguishes it from cellulitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Burn patient has facial burns, soot in mouth, singed nasal hairs, and hoarseness.",
    answers: ["Early endotracheal intubation", "Topical antibiotics only", "Outpatient follow-up", "Oral steroids"],
    correct: 0,
    explanation: "This favors early intubation because inhalation injury signs predict progressive airway edema."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Penetrating chest trauma patient has hypotension, JVD, muffled heart sounds, and equal breath sounds.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Hemothorax", "Pulmonary contusion"],
    correct: 0,
    explanation: "This favors cardiac tamponade because Beck triad with equal breath sounds points away from tension pneumothorax."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Trauma patient has hypotension, severe respiratory distress, absent breath sounds on one side, and tracheal deviation.",
    answers: ["Tension pneumothorax", "Cardiac tamponade", "Flail chest", "Pulmonary embolism"],
    correct: 0,
    explanation: "This favors tension pneumothorax because obstructive shock with unilateral absent breath sounds and tracheal deviation is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Blunt chest trauma patient has paradoxical movement of a chest wall segment.",
    answers: ["Flail chest", "Tension pneumothorax", "Cardiac tamponade", "Rib contusion"],
    correct: 0,
    explanation: "This favors flail chest because paradoxical chest wall motion reflects multiple rib fractures creating a free segment."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Postoperative day 2 patient has low-grade fever and hypoxemia after shallow breathing due to pain.",
    answers: ["Atelectasis", "Wound infection", "Pulmonary embolism", "Anastomotic leak"],
    correct: 0,
    explanation: "This favors atelectasis because early postoperative fever and hypoxemia after splinting/shallow breathing are classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Postoperative day 5 patient has fever, erythema, warmth, and purulent drainage from incision.",
    answers: ["Surgical site infection", "Atelectasis", "Deep vein thrombosis", "Urinary retention"],
    correct: 0,
    explanation: "This favors surgical site infection because wound erythema, warmth, and purulent drainage localize the fever to the incision."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Older patient has sudden painless bright red blood per rectum with soft nontender abdomen.",
    answers: ["Diverticular bleeding", "Ischemic colitis", "Anal fissure", "Peptic ulcer bleeding"],
    correct: 0,
    explanation: "This favors diverticular bleeding because painless large-volume lower GI bleeding in older adults is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has severe anal pain during defecation with small bright red blood on toilet paper.",
    answers: ["Anal fissure", "Internal hemorrhoids", "Diverticular bleeding", "Colorectal cancer"],
    correct: 0,
    explanation: "This favors anal fissure because bleeding is painful and associated with defecation."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has painless bright red blood coating stool with palpable perianal swelling.",
    answers: ["Hemorrhoids", "Anal fissure", "Ischemic colitis", "Inflammatory bowel disease"],
    correct: 0,
    explanation: "This favors hemorrhoids because bright red bleeding with perianal swelling is typically painless."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient with prior laparotomy has vomiting, crampy abdominal pain, distension, and high-pitched bowel sounds.",
    answers: ["Mechanical bowel obstruction", "Ileus", "Gastroenteritis", "Cholecystitis"],
    correct: 0,
    explanation: "This favors mechanical obstruction over ileus because bowel sounds are high-pitched and pain is crampy."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Postoperative patient on opioids has abdominal distension, nausea, absent bowel sounds, and diffuse bowel gas without transition point.",
    answers: ["Ileus", "Mechanical bowel obstruction", "Mesenteric ischemia", "Appendicitis"],
    correct: 0,
    explanation: "This favors ileus because bowel sounds are absent and imaging lacks a focal transition point."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has fever, jaundice, RUQ pain, hypotension, and confusion.",
    answers: ["Ascending cholangitis", "Acute cholecystitis", "Viral hepatitis", "Pancreatitis"],
    correct: 0,
    explanation: "This favors severe ascending cholangitis because Charcot triad plus shock and altered mental status indicates Reynolds pentad."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has painless jaundice, dark urine, pale stools, weight loss, and palpable nontender gallbladder.",
    answers: ["Pancreatic cancer", "Acute hepatitis", "Choledocholithiasis", "Acute cholecystitis"],
    correct: 0,
    explanation: "This favors pancreatic cancer because painless obstructive jaundice with weight loss and Courvoisier sign is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has sudden tearing chest pain radiating to the back with unequal arm blood pressures.",
    answers: ["Aortic dissection", "Acute MI", "Pulmonary embolism", "Pericarditis"],
    correct: 0,
    explanation: "This favors aortic dissection because pain radiates to the back and there is pulse/BP asymmetry."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient with blunt abdominal trauma has hypotension, abdominal tenderness, free fluid on FAST, and left shoulder pain.",
    answers: ["Splenic rupture", "Appendicitis", "Renal colic", "Pancreatitis"],
    correct: 0,
    explanation: "This favors splenic rupture because trauma plus intraperitoneal bleeding and referred left shoulder pain are classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient after pelvic fracture has blood at the urethral meatus and inability to void.",
    answers: ["Urethral injury", "Bladder infection", "Renal stone", "Testicular torsion"],
    correct: 0,
    explanation: "This favors urethral injury because pelvic fracture with blood at the meatus and urinary retention is classic."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has suprapubic pain, inability to urinate, and a distended tender bladder.",
    answers: ["Acute urinary retention", "Pyelonephritis", "Renal infarction", "Ureteral stone"],
    correct: 0,
    explanation: "This favors acute urinary retention because the bladder is distended and the patient cannot void."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Differential",
    vignette: "Patient has fever, drooling, muffled voice, trismus, and progressive neck swelling after dental infection.",
    answers: ["Deep neck space infection", "Viral pharyngitis", "GERD", "Allergic rhinitis"],
    correct: 0,
    explanation: "This favors deep neck space infection because drooling, muffled voice, trismus, and neck swelling indicate airway-risk infection."
  },

  // QUALITY / PATIENT SAFETY — DIFFERENTIAL
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Wrong medication is given to a patient because two patients have similar names and staff used room number for identification.",
    answers: ["Use two patient identifiers", "Ask the patient’s room number", "Rely on the medication label", "Move one patient after the error"],
    correct: 0,
    explanation: "This favors two patient identifiers because room number is not a reliable identifier."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Critical pending lab information is verbally mentioned but omitted from written handoff, contributing to overnight deterioration.",
    answers: ["Standardized handoff tool", "Longer resident shifts", "Verbal reminders only", "More frequent paging"],
    correct: 0,
    explanation: "This favors standardized handoff because structured tools reduce omissions of pending tasks and contingency plans."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Consent and schedule list different surgical laterality before incision.",
    answers: ["Preoperative time-out", "Postoperative debriefing", "Incident report only", "Faster room turnover"],
    correct: 0,
    explanation: "This favors preoperative time-out because it confirms patient, procedure, site, and laterality before incision."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Several ICU patients develop central-line bloodstream infections and sterile insertion practices vary by operator.",
    answers: ["Central-line insertion checklist", "Longer antibiotic courses", "Daily blood cultures for everyone", "More frequent room cleaning only"],
    correct: 0,
    explanation: "This favors a central-line checklist because it standardizes sterile insertion practices to prevent CLABSI."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Ventilated patients have inconsistent head-of-bed elevation, oral care, and sedation interruption.",
    answers: ["Ventilator care bundle", "Routine broad antibiotics", "Daily chest CT", "Delay extubation"],
    correct: 0,
    explanation: "This favors ventilator care bundle because bundled prevention practices reduce VAP risk."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Nurse notices a medication dose is ten times higher than usual, but prescriber insists it is correct.",
    answers: ["Escalate using chain of command", "Administer as ordered", "Wait until next shift", "Ask the family to decide"],
    correct: 0,
    explanation: "This favors escalation because unresolved high-risk medication concerns should not be ignored."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient falls walking to the bathroom at night after receiving sedating medication.",
    answers: ["Fall risk assessment and prevention plan", "Bed rest for all patients", "Physical restraints", "Nocturnal fluid restriction"],
    correct: 0,
    explanation: "This favors targeted fall precautions because sedatives and nighttime toileting increase fall risk."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient returns with hypoglycemia after misunderstanding insulin dosing despite receiving discharge papers.",
    answers: ["Teach-back before discharge", "Longer discharge paperwork", "Avoid insulin prescriptions", "Only verbal instructions"],
    correct: 0,
    explanation: "This favors teach-back because it verifies patient understanding rather than assuming paperwork is understood."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient is readmitted because outpatient clinician did not receive discharge summary or medication changes.",
    answers: ["Improve care transitions", "Change inpatient antibiotic", "Increase length of stay", "Avoid outpatient follow-up"],
    correct: 0,
    explanation: "This favors care transition improvement because the failure is communication across settings."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Home medication is unintentionally omitted on admission, worsening the patient’s chronic disease.",
    answers: ["Medication reconciliation", "Daily weights only", "Pharmacy billing review", "Patient satisfaction survey"],
    correct: 0,
    explanation: "This favors medication reconciliation because comparing home and inpatient medication lists prevents omissions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Clinic wants to test a small workflow change with one physician before scaling it to the whole clinic.",
    answers: ["Plan-Do-Study-Act cycle", "Root cause analysis", "Case-control study", "Randomized trial only"],
    correct: 0,
    explanation: "This favors PDSA because small rapid tests of change are central to quality improvement."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Hospital reviews a fatal error to identify system contributors such as labeling, staffing, and order-entry design.",
    answers: ["Root cause analysis", "PDSA cycle", "Cost-effectiveness analysis", "Patient satisfaction survey"],
    correct: 0,
    explanation: "This favors root cause analysis because serious adverse events are analyzed for underlying system causes."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient is harmed by a medication error but later recovers.",
    answers: ["Disclose the error to the patient", "Hide the error if harm is minor", "Tell only the hospital lawyer", "Wait for the patient to ask"],
    correct: 0,
    explanation: "This favors disclosure because harmful medical errors should be communicated honestly even if the patient recovers."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Wrong medication dose is caught before it reaches the patient.",
    answers: ["Report as a near miss", "Ignore because no harm occurred", "Punish the nurse", "Delete the order silently"],
    correct: 0,
    explanation: "This favors near-miss reporting because caught errors reveal system vulnerabilities."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Many patients still have urinary catheters after there is no longer an indication.",
    answers: ["Remove unnecessary urinary catheters", "Routine antibiotics for all catheterized patients", "Daily urine cultures", "Use larger catheters"],
    correct: 0,
    explanation: "This favors catheter removal because reducing unnecessary catheter days prevents CAUTI."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Immobile patient develops pressure injury after inconsistent repositioning.",
    answers: ["Scheduled turning and pressure offloading", "Routine antibiotics", "Strict bed rest", "Daily blood cultures"],
    correct: 0,
    explanation: "This favors turning and pressure offloading because pressure injury prevention requires reducing sustained pressure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient becomes oversedated with respiratory depression after opioid medication.",
    answers: ["Sedation monitoring after opioids", "Avoid pain assessment", "Use opioids without reassessment", "Discharge immediately"],
    correct: 0,
    explanation: "This favors sedation monitoring because opioid safety requires reassessment of sedation and respirations."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Hospital tracks whether antibiotics are given within 1 hour before incision.",
    answers: ["Process measure", "Outcome measure", "Balancing measure", "Root cause"],
    correct: 0,
    explanation: "This favors process measure because it tracks completion of a care step."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Hospital tracks postoperative infection rates after implementing a checklist.",
    answers: ["Outcome measure", "Process measure", "Balancing measure", "Structural measure"],
    correct: 0,
    explanation: "This favors outcome measure because infection rate reflects the result of care."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "A discharge program reduces readmissions but increases urgent clinic phone calls.",
    answers: ["Balancing measure", "Outcome measure", "Process measure", "Sentinel event"],
    correct: 0,
    explanation: "This favors balancing measure because it tracks unintended consequences of an intervention."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Staff avoid reporting near misses because previous reports led to blame and punishment.",
    answers: ["Just culture", "Individual blame culture", "More secrecy", "Fewer incident reports"],
    correct: 0,
    explanation: "This favors just culture because safety improves when reporting is encouraged while maintaining fair accountability."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient receives a drug despite allergy being documented in a non-alerting part of the chart.",
    answers: ["Improve allergy documentation and alerts", "Remove allergy lists", "Rely on patient wristband only", "Avoid all medications"],
    correct: 0,
    explanation: "This favors improved allergy documentation and alerts because critical safety information must be visible and actionable."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient with limited English proficiency signs consent after family member informally translates.",
    answers: ["Use a professional medical interpreter", "Proceed because family translated", "Use gestures only", "Delay all care indefinitely"],
    correct: 0,
    explanation: "This favors professional interpreter use because informed consent requires accurate, unbiased communication."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Confused hospitalized patient pulls lines and tries to climb out of bed.",
    answers: ["Evaluate reversible causes and use least restrictive safety measures", "Immediately apply permanent restraints", "Ignore behavior", "Sedate without assessment"],
    correct: 0,
    explanation: "This favors evaluating reversible causes and least restrictive measures because restraints/sedation are not first-line without assessment."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient with CKD receives standard-dose nephrotoxic medication because renal dosing guidance was not displayed.",
    answers: ["Clinical decision support for renal dosing", "More handwritten orders", "Avoid all medications", "Delay labs until discharge"],
    correct: 0,
    explanation: "This favors renal-dose clinical decision support because the error came from missing kidney-function-based prescribing guidance."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient with sepsis has worsening vital signs documented but not escalated, delaying antibiotics.",
    answers: ["Early warning system", "Longer progress notes", "Fewer vital sign checks", "Delayed triage"],
    correct: 0,
    explanation: "This favors early warning system because deterioration was present but not recognized or escalated."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "ICU-to-ward transfers have variable phone sign-out and frequent omitted information.",
    answers: ["Structured transfer checklist", "Unstructured phone call only", "Shorter transfer note", "Delay all transfers"],
    correct: 0,
    explanation: "This favors structured transfer checklist because standardization reduces omitted transfer information."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Patient receives duplicate anticoagulation because outpatient and inpatient orders remain active.",
    answers: ["Medication reconciliation", "More frequent INR checks only", "Avoid anticoagulants permanently", "Ask the patient to choose"],
    correct: 0,
    explanation: "This favors medication reconciliation because duplicate therapy results from unreconciled medication lists."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Hospital sends monthly infection-rate reports to each unit to show performance gaps.",
    answers: ["Audit and feedback", "Root cause analysis only", "Case report", "Blame meeting"],
    correct: 0,
    explanation: "This favors audit and feedback because performance data are measured and returned to clinical teams."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Differential",
    vignette: "Resident selects wrong medication dose after repeated interruptions during electronic order entry.",
    answers: ["Reduce interruptions during order entry", "Add more pop-up alerts", "Punish the resident", "Eliminate electronic orders"],
    correct: 0,
    explanation: "This favors reducing interruptions because the failure is a human-factors/system design problem."
  },
    // =========================================================
  // TRAP MODE
  // =========================================================

  // CARDIOLOGY — TRAP
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "72M has crushing chest pain with ST elevations in II, III, and aVF. BP is 82/50 mmHg, lungs are clear, and JVP is elevated. What medication should be avoided initially?",
    answers: ["Nitroglycerin", "Aspirin", "Heparin", "Atorvastatin"],
    correct: 0,
    explanation: "Trap: inferior STEMI with hypotension, clear lungs, and elevated JVP suggests right ventricular infarction. Avoid nitroglycerin because it reduces preload and can worsen shock."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "68F with atrial fibrillation has HR 168/min, BP 78/44 mmHg, confusion, and pulmonary edema. The intern suggests IV diltiazem for rate control. What is the next best step?",
    answers: ["Immediate synchronized cardioversion", "IV diltiazem", "Oral metoprolol", "Outpatient anticoagulation"],
    correct: 0,
    explanation: "Trap: rate control is for stable atrial fibrillation. Hypotension, confusion, and pulmonary edema mean unstable AFib, requiring synchronized cardioversion."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "46M has abrupt tearing chest pain radiating to the back. ECG has nonspecific changes, and troponin is pending. BP is 190/105 in the right arm and 150/88 in the left. What is the most likely diagnosis?",
    answers: ["Aortic dissection", "NSTEMI", "Pericarditis", "Costochondritis"],
    correct: 0,
    explanation: "Trap: chest pain with nonspecific ECG changes can distract toward ACS. Tearing pain to the back with arm BP difference is aortic dissection."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "35F has sharp chest pain after a viral illness. The pain worsens lying flat and improves when leaning forward. ECG shows diffuse ST elevations. What is the most likely diagnosis?",
    answers: ["Acute pericarditis", "STEMI", "GERD", "Pulmonary embolism"],
    correct: 0,
    explanation: "Trap: ST elevation does not always mean STEMI. Diffuse ST elevation with positional pleuritic pain after viral illness points to acute pericarditis."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "76M with known severe aortic stenosis has exertional dyspnea, angina, and syncope. He asks whether increasing his diuretic dose will fix the problem. What is the definitive management?",
    answers: ["Aortic valve replacement evaluation", "High-dose diuretics alone", "Long-term antibiotics", "Reassurance only"],
    correct: 0,
    explanation: "Trap: diuretics may temporarily reduce congestion but are not definitive and can worsen preload dependence. Symptomatic severe aortic stenosis needs valve replacement evaluation."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "19M athlete has exertional near-syncope and a family history of sudden death. Murmur increases when he stands. He feels better after drinking water and wants to return to practice. What is the next best step?",
    answers: ["Restrict competitive sports pending cardiac evaluation", "Clear him to play because hydration helped", "Start empiric antibiotics", "No further workup"],
    correct: 0,
    explanation: "Trap: symptom improvement with hydration should not reassure you. Exertional syncope, sudden-death family history, and murmur louder with standing suggest HCM."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "63F has chest pressure at rest and new ST depressions. Her first troponin is negative. What is the correct interpretation?",
    answers: ["Acute coronary syndrome remains possible", "ACS is excluded", "This is stable angina", "This is uncomplicated GERD"],
    correct: 0,
    explanation: "Trap: a single negative early troponin does not exclude ACS. Rest pain plus new ischemic ECG changes is concerning for acute coronary syndrome."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "60F has sudden pleuritic chest pain and dyspnea after a long flight. Chest x-ray is normal. What is the most likely diagnosis?",
    answers: ["Pulmonary embolism", "Pneumonia", "Pneumothorax", "GERD"],
    correct: 0,
    explanation: "Trap: a normal chest x-ray does not rule out PE. Recent immobility with acute pleuritic dyspnea should trigger pulmonary embolism."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "A trauma patient has hypotension, JVD, and muffled heart sounds. Breath sounds are equal bilaterally. What is the most likely diagnosis?",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Hemothorax", "Pulmonary contusion"],
    correct: 0,
    explanation: "Trap: shock after chest trauma can tempt tension pneumothorax. Equal breath sounds plus Beck triad points to cardiac tamponade."
  },
  {
    topic: "Cardiology",
    mode: "Trap",
    vignette: "58M with prior MI has progressive dyspnea, orthopnea, leg edema, bibasilar crackles, and S3. He denies chest pain. What is the most likely diagnosis?",
    answers: ["Heart failure exacerbation", "COPD exacerbation", "Panic attack", "Pulmonary fibrosis"],
    correct: 0,
    explanation: "Trap: absence of chest pain does not rule out cardiac disease. Orthopnea, edema, crackles, and S3 point to heart failure exacerbation."
  },

  // PULMONOLOGY — TRAP
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "A trauma patient has severe respiratory distress, hypotension, tracheal deviation, and absent breath sounds on the left. A chest x-ray is being ordered. What is the next best step?",
    answers: ["Needle decompression", "Wait for chest x-ray", "CT chest", "Nebulized albuterol"],
    correct: 0,
    explanation: "Trap: do not wait for imaging in suspected tension pneumothorax. Obstructive shock with unilateral absent breath sounds requires immediate decompression."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "27F has episodic wheezing and nighttime cough. Her lung exam is normal in clinic today. Symptoms improve with albuterol. What is the most likely diagnosis?",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Pneumonia"],
    correct: 0,
    explanation: "Trap: a normal exam between episodes does not exclude asthma. Episodic nocturnal symptoms with bronchodilator response point to asthma."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "55M has months of cough, night sweats, weight loss, hemoptysis, and an upper-lobe cavitary lesion. He asks for cough syrup and outpatient follow-up. What is the most likely diagnosis?",
    answers: ["Tuberculosis", "Viral bronchitis", "Asthma", "GERD"],
    correct: 0,
    explanation: "Trap: chronic cough should not be treated symptomatically when constitutional symptoms, hemoptysis, and cavitation are present. This pattern suggests tuberculosis."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "A patient with sepsis develops severe hypoxemia and bilateral infiltrates. BNP is normal, echo is normal, and there is no volume overload. What is the most likely diagnosis?",
    answers: ["ARDS", "Cardiogenic pulmonary edema", "COPD exacerbation", "Asthma"],
    correct: 0,
    explanation: "Trap: bilateral infiltrates are not automatically heart failure. Sepsis with severe hypoxemia and no cardiac overload points to ARDS."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "42M has recurrent cough and dyspnea after cleaning bird cages. Symptoms improve when he avoids the birds. What is the most likely diagnosis?",
    answers: ["Hypersensitivity pneumonitis", "Idiopathic pulmonary fibrosis", "Tuberculosis", "Pulmonary embolism"],
    correct: 0,
    explanation: "Trap: do not ignore exposure timing. Recurrent respiratory symptoms linked to bird antigen exposure suggest hypersensitivity pneumonitis."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "67M smoker has weight loss and a spiculated upper-lobe lung nodule. He says his allergies have been worse this month. What is the most likely diagnosis?",
    answers: ["Lung cancer", "Seasonal allergies", "Simple bronchitis", "Asthma"],
    correct: 0,
    explanation: "Trap: allergy symptoms do not explain weight loss and a spiculated lung nodule in a smoker. Treat as lung cancer until proven otherwise."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "A patient with heart failure has acute dyspnea, orthopnea, diffuse crackles, pink frothy sputum, and wheezing. What is the most likely diagnosis?",
    answers: ["Cardiogenic pulmonary edema", "COPD exacerbation", "Upper airway cough syndrome", "Pulmonary fibrosis"],
    correct: 0,
    explanation: "Trap: wheezing can occur in pulmonary edema. Orthopnea, crackles, and pink frothy sputum point to cardiogenic pulmonary edema."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "A patient with leg immobilization has sudden pleuritic chest pain, dyspnea, tachycardia, and hypoxemia. Chest x-ray is normal. What is the most likely diagnosis?",
    answers: ["Pulmonary embolism", "Pneumonia", "GERD", "Costochondritis"],
    correct: 0,
    explanation: "Trap: a normal chest x-ray does not exclude PE. Immobilization plus acute pleuritic dyspnea and hypoxemia points to pulmonary embolism."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "A long-term smoker has chronic cough and increased sputum production for at least 3 months per year for 2 consecutive years. What is the most likely diagnosis?",
    answers: ["Chronic bronchitis", "Asthma", "Bronchiectasis", "Sarcoidosis"],
    correct: 0,
    explanation: "Trap: not every chronic cough in a smoker is cancer or asthma. The 3-months-per-year for 2-years definition points to chronic bronchitis."
  },
  {
    topic: "Pulmonology",
    mode: "Trap",
    vignette: "29F has cough, dyspnea, erythema nodosum, and bilateral hilar lymphadenopathy. She had a remote TB exposure as a child. What is the most likely diagnosis?",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Pulmonary edema"],
    correct: 0,
    explanation: "Trap: remote TB exposure can distract. Erythema nodosum with bilateral hilar lymphadenopathy strongly suggests sarcoidosis."
  },
  // NEPHROLOGY — TRAP

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "A dialysis patient has weakness and palpitations. Potassium is 7.1 mEq/L, ECG shows peaked T waves and QRS widening. The team is waiting for repeat potassium. What is the next best step?",

    answers: ["IV calcium gluconate", "Repeat potassium before treatment", "Oral potassium binder only", "Low-potassium diet"],

    correct: 0,

    explanation: "Trap: do not wait for repeat labs when hyperkalemia has ECG changes. IV calcium stabilizes the myocardium immediately."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "24M has gross hematuria 2 days after sore throat. Complement is normal. His friend says post-strep kidney disease causes cola urine. What is the most likely diagnosis?",

    answers: ["IgA nephropathy", "Poststreptococcal glomerulonephritis", "Minimal change disease", "Diabetic nephropathy"],

    correct: 0,

    explanation: "Trap: sore throat can distract toward PSGN. Hematuria within days of URI with normal complement points to IgA nephropathy."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "A septic ICU patient develops AKI. Urine microscopy shows muddy brown granular casts. The team thinks it is only dehydration. What is the most likely diagnosis?",

    answers: ["Acute tubular necrosis", "Prerenal azotemia only", "Minimal change disease", "Cystitis"],

    correct: 0,

    explanation: "Trap: muddy brown casts indicate tubular injury, not purely prerenal azotemia. Sepsis/hypoperfusion points to acute tubular necrosis."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "53M with 20 years of poorly controlled diabetes has gradual CKD and heavy proteinuria. He has no hematuria or RBC casts. What is the most likely diagnosis?",

    answers: ["Diabetic nephropathy", "IgA nephropathy", "Postrenal obstruction", "Pyelonephritis"],

    correct: 0,

    explanation: "Trap: heavy proteinuria does not automatically mean a primary glomerulopathy. Long-standing diabetes with gradual proteinuric CKD suggests diabetic nephropathy."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "30F has recurrent flank pain and hematuria. Ultrasound shows enlarged kidneys with numerous bilateral cysts. Her father required dialysis. She had a UTI last year. What is the most likely diagnosis?",

    answers: ["Autosomal dominant polycystic kidney disease", "Recurrent pyelonephritis", "Simple renal cysts", "Renal cell carcinoma"],

    correct: 0,

    explanation: "Trap: a prior UTI does not explain bilateral enlarged cystic kidneys with family history of dialysis. This is ADPKD."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "59M with small cell lung cancer has sodium 121 mEq/L. He is euvolemic, urine osmolality is high, and urine sodium is high. What is the most likely diagnosis?",

    answers: ["SIADH", "Primary polydipsia", "Diabetes insipidus", "Hypovolemic hyponatremia"],

    correct: 0,

    explanation: "Trap: low sodium does not mean the patient needs free water. Euvolemic hyponatremia with inappropriately concentrated urine suggests SIADH."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "68F with decades of hypertension has slowly progressive CKD, mild proteinuria, and bland urine sediment. She worries about lupus because her niece has it. What is the most likely diagnosis?",

    answers: ["Hypertensive nephrosclerosis", "Lupus nephritis", "Acute interstitial nephritis", "Poststreptococcal GN"],

    correct: 0,

    explanation: "Trap: family concern about lupus should not override the bland gradual pattern. Long-standing hypertension with mild proteinuria suggests hypertensive nephrosclerosis."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "40M has fever, nausea, dysuria, flank pain, and left CVA tenderness. He asks if this is just bladder irritation. What is the most likely diagnosis?",

    answers: ["Pyelonephritis", "Simple cystitis", "Urethritis", "Renal cell carcinoma"],

    correct: 0,

    explanation: "Trap: urinary symptoms alone can suggest cystitis, but fever, nausea, flank pain, and CVA tenderness indicate pyelonephritis."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "45F has generalized edema and frothy urine. Urinalysis shows 4+ protein but no RBC casts. BP is normal. What syndrome is present?",

    answers: ["Nephrotic syndrome", "Nephritic syndrome", "Acute tubular necrosis", "Postrenal obstruction"],

    correct: 0,

    explanation: "Trap: normal BP does not exclude nephrotic syndrome. Heavy proteinuria and edema without active sediment indicate nephrotic syndrome."

  },

  {

    topic: "Nephrology",

    mode: "Trap",

    vignette: "52M has severe colicky flank pain radiating to the groin. He is pacing and cannot get comfortable. Urinalysis shows microscopic hematuria and no pyuria. What is the most likely diagnosis?",

    answers: ["Ureteral stone", "Pyelonephritis", "Appendicitis", "Renal cell carcinoma"],

    correct: 0,

    explanation: "Trap: severe flank pain is not automatically infection. Afebrile colicky flank-to-groin pain with hematuria suggests ureteral stone."

  },

  // GASTROENTEROLOGY/HEPATOLOGY — TRAP

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "49F has burning chest discomfort after meals, sour taste, and symptoms worse when lying down. She worries because her father had an MI. What is the most likely diagnosis?",

    answers: ["GERD", "Acute coronary syndrome", "Acute pancreatitis", "Esophageal rupture"],

    correct: 0,

    explanation: "Trap: family cardiac history can distract, but postprandial burning with regurgitation and supine worsening points to GERD."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "63M with cirrhosis vomits a large amount of blood after retching once. He is hypotensive. What is the most likely source?",

    answers: ["Esophageal varices", "Mallory-Weiss tear", "Hemorrhoids", "Anal fissure"],

    correct: 0,

    explanation: "Trap: retching can distract toward Mallory-Weiss tear, but cirrhosis with massive hematemesis points to variceal bleeding."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "35F has RUQ pain after fatty meals. Prior episodes lasted 30 minutes, but this episode has persisted for 12 hours with fever and positive Murphy sign. What is the most likely diagnosis?",

    answers: ["Acute cholecystitis", "Biliary colic", "GERD", "IBS"],

    correct: 0,

    explanation: "Trap: prior brief episodes suggest biliary colic history, but persistent pain with fever and Murphy sign indicates acute cholecystitis."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "59M with heavy alcohol use has severe epigastric pain radiating to his back and repeated vomiting. He thinks it is gastritis. What is the most likely diagnosis?",

    answers: ["Acute pancreatitis", "GERD", "Appendicitis", "Viral gastroenteritis"],

    correct: 0,

    explanation: "Trap: epigastric pain after alcohol is not always gastritis. Back radiation and vomiting point to acute pancreatitis."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "43M has chronic diarrhea, bloating, fatigue, and iron deficiency anemia. He was previously told he has IBS, but symptoms improve when he avoids wheat. What is the most likely diagnosis?",

    answers: ["Celiac disease", "Irritable bowel syndrome", "Lactose intolerance", "Diverticulitis"],

    correct: 0,

    explanation: "Trap: iron deficiency is not typical IBS. Malabsorptive symptoms with gluten association point to celiac disease."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "30F develops watery diarrhea and cramping after finishing clindamycin. She also ate takeout yesterday. What is the most likely diagnosis?",

    answers: ["C difficile infection", "IBS", "Appendicitis", "GERD"],

    correct: 0,

    explanation: "Trap: takeout can distract toward simple food poisoning, but watery diarrhea after antibiotics points to C difficile infection."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "52M with chronic hepatitis C has new ascites, jaundice, easy bruising, leg edema, and spider angiomas. What is the most likely diagnosis?",

    answers: ["Decompensated cirrhosis", "Uncomplicated acute hepatitis", "GERD", "IBS"],

    correct: 0,

    explanation: "Trap: chronic liver disease with ascites and coagulopathy signs is not uncomplicated hepatitis. This is decompensated cirrhosis."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "38M has fever and steady LLQ abdominal pain. He thinks he strained a muscle while lifting. CT shows localized sigmoid inflammation. What is the most likely diagnosis?",

    answers: ["Diverticulitis", "Appendicitis", "Renal colic", "IBS"],

    correct: 0,

    explanation: "Trap: muscle strain should not explain fever and sigmoid inflammation. LLQ pain with sigmoid inflammation points to diverticulitis."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "56F has years of abdominal discomfort with alternating constipation and diarrhea. Pain improves after bowel movements. She has no anemia, fever, blood in stool, or weight loss. What is the most likely diagnosis?",

    answers: ["Irritable bowel syndrome", "Crohn disease", "Colon cancer", "C difficile infection"],

    correct: 0,

    explanation: "Trap: alternating bowel habits can sound alarming, but chronic pain relieved by defecation without red flags points to IBS."

  },

  {

    topic: "Gastroenterology/Hepatology",

    mode: "Trap",

    vignette: "47M has progressive dysphagia, first to steak and bread, now to liquids. He has reflux symptoms and lost 15 lb. What is the most concerning diagnosis?",

    answers: ["Esophageal cancer", "Uncomplicated GERD", "IBS", "Viral gastroenteritis"],

    correct: 0,

    explanation: "Trap: reflux symptoms should not reassure you. Progressive solids-to-liquids dysphagia with weight loss is concerning for esophageal cancer."

  },
    // ENDOCRINOLOGY — TRAP
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "19M with type 1 diabetes has vomiting, abdominal pain, glucose 480 mg/dL, anion-gap metabolic acidosis, and serum potassium 2.9 mEq/L. What should be done before insulin?",
    answers: ["Replete potassium", "Give insulin immediately without potassium", "Give oral glucose", "Discharge with follow-up"],
    correct: 0,
    explanation: "Trap: insulin shifts potassium intracellularly and can worsen hypokalemia. In DKA with low potassium, replete potassium before starting insulin."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "70F with type 2 diabetes is confused and profoundly dehydrated. Glucose is 940 mg/dL, serum osmolality is high, and ketones are minimal. What is the most likely diagnosis?",
    answers: ["Hyperosmolar hyperglycemic state", "Diabetic ketoacidosis", "Insulinoma", "Hypothyroidism"],
    correct: 0,
    explanation: "Trap: severe hyperglycemia is not always DKA. Extreme hyperglycemia with high osmolality and minimal ketones points to HHS."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "58M has weight loss despite increased appetite, tremor, heat intolerance, palpitations, and diffuse goiter. He says work stress explains everything. What is the most likely diagnosis?",
    answers: ["Hyperthyroidism", "Panic disorder only", "Hypothyroidism", "Cushing syndrome"],
    correct: 0,
    explanation: "Trap: stress can mimic palpitations, but weight loss, heat intolerance, tremor, and goiter point to hyperthyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "43F has fatigue, constipation, weight gain, dry skin, cold intolerance, and HR 54/min. She thinks it is just a busy schedule. What is the most likely diagnosis?",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Pheochromocytoma", "Panic disorder"],
    correct: 0,
    explanation: "Trap: fatigue is nonspecific, but cold intolerance, constipation, dry skin, weight gain, and bradycardia point to hypothyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "52M has resistant hypertension despite three medications. He takes no diuretics. Potassium is 2.9 mEq/L and bicarbonate is elevated. What is the most likely diagnosis?",
    answers: ["Primary hyperaldosteronism", "Essential hypertension only", "SIADH", "Addison disease"],
    correct: 0,
    explanation: "Trap: resistant hypertension with hypokalemic metabolic alkalosis is not simple essential hypertension. Think primary hyperaldosteronism."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "39F has central weight gain, facial rounding, proximal weakness, easy bruising, hypertension, and wide purple striae. She says she has just exercised less lately. What is the most likely diagnosis?",
    answers: ["Cushing syndrome", "Simple obesity", "Hypothyroidism", "PCOS only"],
    correct: 0,
    explanation: "Trap: simple weight gain does not cause purple striae, easy bruising, and proximal weakness. This pattern suggests Cushing syndrome."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "26F has irregular menses, acne, coarse facial hair, and infertility. Pregnancy test, TSH, and prolactin are normal. What is the most likely diagnosis?",
    answers: ["PCOS", "Normal cycle variation", "Menopause", "Asherman syndrome"],
    correct: 0,
    explanation: "Trap: irregular menses plus hyperandrogenism should not be dismissed as normal variation. This pattern suggests PCOS."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "68M has recurrent kidney stones, constipation, fatigue, and bone pain. Calcium and PTH are both elevated. What is the most likely diagnosis?",
    answers: ["Primary hyperparathyroidism", "Vitamin D deficiency", "Hypocalcemia", "SIADH"],
    correct: 0,
    explanation: "Trap: bone pain and fatigue can be vague, but high calcium with high PTH points to primary hyperparathyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "53F after menopause has a wrist fracture after falling from standing height. She says she is just clumsy. What diagnosis should be evaluated?",
    answers: ["Osteoporosis", "Normal aging only", "Osteoarthritis", "Cellulitis"],
    correct: 0,
    explanation: "Trap: a low-trauma fracture is not just clumsiness. Fragility fracture should trigger osteoporosis evaluation."
  },
  {
    topic: "Endocrinology",
    mode: "Trap",
    vignette: "42M without diabetes has recurrent fasting episodes of sweating, tremor, blurred vision, and confusion that resolve after juice. He thinks these are panic attacks. What is the most likely diagnosis?",
    answers: ["Insulinoma", "Panic disorder", "Hypothyroidism", "Diabetes insipidus"],
    correct: 0,
    explanation: "Trap: adrenergic symptoms can mimic panic, but fasting neuroglycopenic symptoms relieved by glucose suggest insulinoma."
  },

  // HEMATOLOGY/ONCOLOGY — TRAP
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "53F has fatigue, dyspnea, heavy menstrual bleeding, microcytosis, and low ferritin. She recently started eating less meat. What is the most likely diagnosis?",
    answers: ["Iron deficiency anemia", "Thalassemia trait", "B12 deficiency", "Aplastic anemia"],
    correct: 0,
    explanation: "Trap: diet can contribute, but heavy bleeding with microcytosis and low ferritin points to iron deficiency anemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "68M has macrocytosis, glossitis, numb feet, gait instability, and decreased vibration sense. He drinks alcohol socially. What deficiency is most likely?",
    answers: ["Vitamin B12 deficiency", "Folate deficiency only", "Iron deficiency", "Thalassemia"],
    correct: 0,
    explanation: "Trap: alcohol can cause macrocytosis, but neurologic deficits point to vitamin B12 deficiency."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "39F has fatigue, jaundice, dark urine, splenomegaly, indirect hyperbilirubinemia, and reticulocytosis. She denies heavy menstrual bleeding. What process is occurring?",
    answers: ["Hemolysis", "Iron deficiency from bleeding", "Aplastic anemia", "Anemia of chronic disease"],
    correct: 0,
    explanation: "Trap: anemia is not always from blood loss. Jaundice, dark urine, and reticulocytosis indicate hemolysis."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "A child with sickle cell disease presents with fever but no pain crisis. Parents ask if they can observe at home because pain is absent. What is the next best step?",
    answers: ["Urgent evaluation for infection", "Home observation only", "Iron supplementation only", "Routine clinic follow-up in 1 month"],
    correct: 0,
    explanation: "Trap: absence of pain does not make fever safe in sickle cell disease. Functional asplenia makes fever a medical urgency."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "65M has fatigue, bruising, and recurrent infections. CBC shows low hemoglobin, low WBCs, and low platelets. What is the most likely problem?",
    answers: ["Marrow failure", "Isolated ITP", "Hemophilia", "Iron deficiency"],
    correct: 0,
    explanation: "Trap: bruising can suggest isolated platelet disease, but pancytopenia points to marrow failure."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "24F has fever, confusion, renal injury, thrombocytopenia, and schistocytes. Coagulation studies are near normal. ADAMTS13 testing is pending. What is the next best step?",
    answers: ["Urgent plasma exchange", "Wait for ADAMTS13 result", "Platelet transfusion only", "Iron supplementation"],
    correct: 0,
    explanation: "Trap: do not wait for confirmatory ADAMTS13 in suspected TTP. MAHA with neurologic/renal findings requires urgent plasma exchange."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "59M has fatigue, recurrent infections, gum bleeding, anemia, thrombocytopenia, and many blasts on smear. He was recently treated for gingivitis. What is the most likely diagnosis?",
    answers: ["Acute leukemia", "Dental disease only", "Iron deficiency anemia", "ITP"],
    correct: 0,
    explanation: "Trap: gum bleeding can be misattributed to dental disease, but blasts and cytopenias indicate acute leukemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "73M has back pain, anemia, renal dysfunction, recurrent infections, high total protein, and lytic bone lesions. He thinks it is arthritis. What is the most likely diagnosis?",
    answers: ["Multiple myeloma", "Osteoarthritis only", "Hodgkin lymphoma", "Iron deficiency anemia"],
    correct: 0,
    explanation: "Trap: back pain in older adults is common, but CRAB findings with lytic lesions and high protein point to multiple myeloma."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "47F on warfarin has INR 9.2 but no active bleeding and stable vital signs. A student suggests protamine. What is the appropriate reversal agent if medication reversal is needed?",
    answers: ["Vitamin K", "Protamine", "Platelet transfusion", "Desmopressin"],
    correct: 0,
    explanation: "Trap: protamine reverses heparin, not warfarin. Warfarin reversal uses vitamin K, with PCC/FFP for serious bleeding."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trap",
    vignette: "32M has painless cervical lymphadenopathy, fevers, night sweats, weight loss, and pruritus. He recently had a sore throat. What is the most likely diagnosis?",
    answers: ["Hodgkin lymphoma", "Reactive lymphadenopathy only", "Iron deficiency", "ITP"],
    correct: 0,
    explanation: "Trap: recent sore throat can distract, but persistent painless lymphadenopathy with B symptoms and pruritus suggests Hodgkin lymphoma."
  },
    // INFECTIOUS DISEASE — TRAP
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "48M with pneumonia has persistent hypotension despite fluids, confusion, low urine output, and elevated lactate. Blood cultures are being drawn. What is the next best step?",
    answers: ["Start broad-spectrum antibiotics now", "Wait for all culture results", "Give cough suppressants only", "Discharge with oral fluids"],
    correct: 0,
    explanation: "Trap: cultures are important, but antibiotics should not be delayed in septic shock."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "35M has fever, severe headache, neck stiffness, confusion, and a petechial rash. CT scanner availability is delayed. What is the next best step?",
    answers: ["Start empiric antibiotics promptly", "Wait for CT before any treatment", "Treat as migraine", "Discharge with analgesics"],
    correct: 0,
    explanation: "Trap: do not delay antibiotics in suspected bacterial meningitis when clinical concern is high."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "29M has fever, confusion, personality change, focal seizures, and temporal lobe abnormalities on MRI. What treatment should be started immediately?",
    answers: ["Acyclovir", "Oseltamivir", "Fluconazole", "Albendazole"],
    correct: 0,
    explanation: "Trap: psychiatric-like behavior changes can distract. Fever, focal seizures, and temporal lobe findings indicate HSV encephalitis needing acyclovir."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "53M with a prosthetic valve has persistent fever and a new murmur. He recently had dental cleaning and feels otherwise well. What is the most likely diagnosis?",
    answers: ["Infective endocarditis", "Viral URI", "Pericarditis", "GERD"],
    correct: 0,
    explanation: "Trap: feeling well does not exclude endocarditis. Prosthetic valve with fever and new murmur should trigger infective endocarditis."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "40F develops watery diarrhea after undercooked poultry. She is stable, immunocompetent, afebrile, and has no blood in stool. What is the best management?",
    answers: ["Supportive care", "Immediate broad-spectrum antibiotics for all cases", "Emergency surgery", "Antitoxin"],
    correct: 0,
    explanation: "Trap: foodborne exposure does not automatically require antibiotics. Stable nonbloody diarrhea in an immunocompetent patient is usually supportive care."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "5-year-old unvaccinated child has high fever, cough, coryza, conjunctivitis, and a rash that starts on the face. What is the most likely diagnosis?",
    answers: ["Measles", "Rubella", "Varicella", "Scarlet fever"],
    correct: 0,
    explanation: "Trap: do not call this a nonspecific viral exanthem. The 3 Cs plus cephalocaudal rash in an unvaccinated child point to measles."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "31M has a painful genital ulcer with ragged borders and tender inguinal lymph nodes. He is worried about syphilis. What is the most likely diagnosis?",
    answers: ["Chancroid", "Syphilis", "Granuloma inguinale", "Lymphogranuloma venereum"],
    correct: 0,
    explanation: "Trap: syphilis classically causes a painless chancre. Painful ulcer with tender nodes suggests chancroid."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "28F with advanced HIV has progressive dyspnea, dry cough, hypoxemia, and diffuse bilateral hazy infiltrates. There is no lobar consolidation. What is the most likely diagnosis?",
    answers: ["Pneumocystis pneumonia", "Typical bacterial pneumonia", "Asthma", "GERD"],
    correct: 0,
    explanation: "Trap: pneumonia does not always mean lobar consolidation. Advanced HIV with dry cough, hypoxemia, and diffuse infiltrates suggests Pneumocystis pneumonia."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "52M develops jaundice, dark urine, fatigue, and RUQ discomfort 8 weeks after a needlestick injury. What is the most likely diagnosis?",
    answers: ["Acute hepatitis B", "Chronic hepatitis B", "Resolved hepatitis B", "Hepatitis B immunity"],
    correct: 0,
    explanation: "Trap: chronic hepatitis B requires persistence over time. Symptomatic hepatitis weeks after blood exposure suggests acute hepatitis B."
  },
  {
    topic: "Infectious Disease",
    mode: "Trap",
    vignette: "49M returns from West Africa with recurrent fevers, shaking chills, sweats, jaundice, and anemia. He took antipyretics with temporary improvement. What is the most likely diagnosis?",
    answers: ["Malaria", "Influenza", "IBS", "Strep throat"],
    correct: 0,
    explanation: "Trap: antipyretic response does not make this routine viral fever. Cyclic fevers with anemia/jaundice after endemic travel suggest malaria."
  },

  // NEUROLOGY — TRAP
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "68M suddenly develops aphasia and right arm weakness 2 hours ago. Glucose is normal. His symptoms seem slightly improved in triage. What is the next best step?",
    answers: ["Activate acute stroke evaluation", "Wait to see if symptoms fully resolve", "Treat as anxiety", "Schedule outpatient neurology"],
    correct: 0,
    explanation: "Trap: slight improvement should not delay time-sensitive stroke evaluation. Sudden focal deficit within the treatment window needs urgent stroke pathway."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "55F with a long migraine history develops an abrupt worst headache of life that reaches maximal intensity immediately and is followed by neck stiffness. What is the most likely diagnosis?",
    answers: ["Subarachnoid hemorrhage", "Migraine", "Tension headache", "Sinusitis"],
    correct: 0,
    explanation: "Trap: migraine history should not reassure you. Thunderclap headache with meningismus is subarachnoid hemorrhage until proven otherwise."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "8-year-old has a generalized seizure lasting 7 minutes. He previously had brief febrile seizures. What is the correct classification of this event?",
    answers: ["Status epilepticus", "Simple febrile seizure", "Absence seizure", "Syncope"],
    correct: 0,
    explanation: "Trap: prior brief febrile seizures should not reassure you. A seizure lasting more than 5 minutes is status epilepticus."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "43F wakes with unilateral facial weakness involving forehead wrinkling, eye closure, and mouth movement. Arm and leg strength are normal. What is the most likely diagnosis?",
    answers: ["Bell palsy", "Cortical stroke", "Trigeminal neuralgia", "Migraine"],
    correct: 0,
    explanation: "Trap: facial droop is not always cortical stroke. Forehead involvement with isolated facial weakness points to peripheral facial nerve palsy."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "39M develops ascending weakness several days after diarrhea. Reflexes are absent, and he says breathing feels harder. What should be monitored closely?",
    answers: ["Respiratory function", "Visual acuity only", "Serum calcium only", "Skin biopsy"],
    correct: 0,
    explanation: "Trap: GBS is not only a limb weakness problem. Respiratory failure can occur, so respiratory function must be monitored."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "56F gradually forgets appointments, gets lost near home, and can no longer manage finances. Her family says everyone misplaces keys sometimes. What is the most likely diagnosis?",
    answers: ["Alzheimer disease", "Normal aging", "Delirium", "Bell palsy"],
    correct: 0,
    explanation: "Trap: misplacing keys can be normal, but progressive memory decline with impaired daily function is dementia, commonly Alzheimer disease."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "32M has drooping eyelids and double vision that worsen by evening and improve after rest. He spends long hours on a computer. What is the most likely diagnosis?",
    answers: ["Myasthenia gravis", "Eye strain only", "Parkinson disease", "Migraine"],
    correct: 0,
    explanation: "Trap: computer use can distract, but fatigable ptosis and diplopia are classic for myasthenia gravis."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "59M has hand tremor worse when nervous, but exam shows rest tremor, bradykinesia, rigidity, small handwriting, and shuffling gait. What is the most likely diagnosis?",
    answers: ["Parkinson disease", "Essential tremor", "Cerebellar ataxia", "Myasthenia gravis"],
    correct: 0,
    explanation: "Trap: anxiety can worsen any tremor, but rest tremor with bradykinesia and rigidity points to Parkinson disease."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "25F has episodes of vision loss, limb numbness, and imbalance months apart, each partially resolving. She is anxious about the symptoms. MRI shows lesions in different CNS regions. What is the most likely diagnosis?",
    answers: ["Multiple sclerosis", "Panic disorder", "TIA only", "Bell palsy"],
    correct: 0,
    explanation: "Trap: anxiety may coexist, but objective neurologic deficits separated in time and space point to multiple sclerosis."
  },
  {
    topic: "Neurology",
    mode: "Trap",
    vignette: "69M has recurrent spinning vertigo lasting hours with tinnitus, ear fullness, and fluctuating hearing loss. He tried motion sickness pills with partial relief. What is the most likely diagnosis?",
    answers: ["Ménière disease", "BPPV", "Vestibular neuritis", "Stroke"],
    correct: 0,
    explanation: "Trap: partial symptom relief does not make it BPPV. Vertigo lasting hours with auditory symptoms suggests Ménière disease."
  },
    // PSYCHIATRY — TRAP
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "34F lost her job 5 weeks ago. Since then she has anhedonia, early-morning awakening, excessive guilt, poor concentration, and missed several interviews. What is the most likely diagnosis?",
    answers: ["Major depressive disorder", "Normal stress response", "Adjustment disorder only", "Persistent depressive disorder"],
    correct: 0,
    explanation: "Trap: a clear stressor does not exclude MDD. Full depressive syndrome lasting more than 2 weeks with impairment supports major depressive disorder."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "29M has slept 2 hours nightly for 6 days, talks rapidly, feels destined for greatness, and spent his rent money on a business idea. He is hospitalized for unsafe behavior. What is the diagnosis?",
    answers: ["Mania", "Hypomania", "ADHD", "Generalized anxiety disorder"],
    correct: 0,
    explanation: "Trap: high productivity language can sound positive, but hospitalization/marked impairment makes this mania, not hypomania."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "46M worries most days about bills, health, work, and family safety. He has muscle tension and poor sleep. He does not have discrete panic attacks. What is the most likely diagnosis?",
    answers: ["Generalized anxiety disorder", "Panic disorder", "OCD", "Social anxiety disorder"],
    correct: 0,
    explanation: "Trap: chronic worry across multiple domains is GAD. Panic disorder requires recurrent discrete panic attacks with fear of recurrence."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "37F has recurrent sudden episodes of chest tightness, trembling, and fear of dying. Cardiac workup is normal. She now avoids stores because she fears another episode. What is the most likely diagnosis?",
    answers: ["Panic disorder", "Generalized anxiety disorder", "Specific phobia", "Acute coronary syndrome"],
    correct: 0,
    explanation: "Trap: chest symptoms can distract toward endless cardiac workups, but recurrent unexpected attacks with avoidance after negative evaluation suggest panic disorder."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "54M was assaulted 4 months ago. He says he is fine, but he avoids the area, has nightmares, startles easily, and feels detached from family. What is the most likely diagnosis?",
    answers: ["PTSD", "Acute stress disorder", "Adjustment disorder", "Generalized anxiety disorder"],
    correct: 0,
    explanation: "Trap: minimizing symptoms should not reassure you. Trauma-related avoidance, nightmares, and hyperarousal beyond 1 month indicate PTSD."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "30F checks the stove and door locks for over an hour daily. She knows it is irrational but feels unbearable anxiety unless she repeats the checking. What is the most likely diagnosis?",
    answers: ["OCD", "Psychosis", "Paranoid personality disorder", "Generalized anxiety disorder"],
    correct: 0,
    explanation: "Trap: fear of danger can sound paranoid, but preserved insight with compulsive rituals points to OCD."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "23M has 8 months of hallucinations, fixed paranoid delusions, disorganized speech, poor hygiene, and decline in school function. Urine toxicology is negative. What is the most likely diagnosis?",
    answers: ["Schizophrenia", "Brief psychotic disorder", "Schizophreniform disorder", "Substance-induced psychosis"],
    correct: 0,
    explanation: "Trap: duration matters. Psychosis with functional decline beyond 6 months is schizophrenia."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "40F has recurrent binge eating followed by vomiting and laxative use. BMI is 23 kg/m², potassium is low, and dental enamel is worn. What is the most likely diagnosis?",
    answers: ["Bulimia nervosa", "Anorexia nervosa", "Binge eating disorder", "ARFID"],
    correct: 0,
    explanation: "Trap: purging does not automatically mean anorexia. Bingeing with compensatory purging and normal BMI suggests bulimia nervosa."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "51M with heavy alcohol use has tremor, sweating, tachycardia, hypertension, and anxiety 10 hours after his last drink. He says hospitals make him nervous. What is the most likely diagnosis?",
    answers: ["Alcohol withdrawal", "Panic disorder", "Wernicke encephalopathy", "Hepatic encephalopathy"],
    correct: 0,
    explanation: "Trap: anxiety can distract, but tremor and autonomic hyperactivity within hours after alcohol cessation indicate withdrawal."
  },
  {
    topic: "Psychiatry",
    mode: "Trap",
    vignette: "39M exaggerates achievements, needs constant praise, uses coworkers for advancement, and shows little concern when his actions harm others. What is the most likely personality disorder?",
    answers: ["Narcissistic personality disorder", "Borderline personality disorder", "Avoidant personality disorder", "OCPD"],
    correct: 0,
    explanation: "Trap: workplace conflict is nonspecific. Grandiosity, need for admiration, exploitation, and lack of empathy point to narcissistic personality disorder."
  },

  // RHEUMATOLOGY — TRAP
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "50F has hand pain from work, but exam shows symmetric swelling of wrists and MCP joints with morning stiffness lasting 90 minutes. What is the most likely diagnosis?",
    answers: ["Rheumatoid arthritis", "Osteoarthritis", "Gout", "Fibromyalgia"],
    correct: 0,
    explanation: "Trap: hand overuse can distract. Symmetric MCP/wrist swelling with prolonged morning stiffness points to rheumatoid arthritis."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "33F has fatigue, joint pain, oral ulcers, photosensitive rash, and pleuritic chest pain. She recently changed sunscreen. What is the most likely diagnosis?",
    answers: ["Systemic lupus erythematosus", "Contact dermatitis only", "Osteoarthritis", "Gout"],
    correct: 0,
    explanation: "Trap: sunscreen change can distract, but oral ulcers, photosensitivity, arthritis, and serositis suggest SLE."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "49M wakes with sudden severe pain, redness, and swelling of the first MTP joint after steak and beer. He worries it is cellulitis. What is the most likely diagnosis?",
    answers: ["Gout", "Cellulitis", "Rheumatoid arthritis", "Osteoarthritis"],
    correct: 0,
    explanation: "Trap: red painful toe can mimic cellulitis, but abrupt podagra after alcohol/purine intake points to gout."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "68F with osteoarthritis has sudden recurrent swelling of one knee. X-ray shows chondrocalcinosis. What is the most likely diagnosis?",
    answers: ["Pseudogout", "Rheumatoid arthritis", "Polymyalgia rheumatica", "Fibromyalgia"],
    correct: 0,
    explanation: "Trap: do not assume all acute monoarthritis is gout. Older patient with knee involvement and chondrocalcinosis suggests pseudogout."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "70M has shoulder and hip stiffness for hours each morning. Family says he is weak, but strength is normal when pain is controlled. What is the most likely diagnosis?",
    answers: ["Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis", "Fibromyalgia"],
    correct: 0,
    explanation: "Trap: pain-limited movement can be mistaken for weakness. PMR causes girdle pain/stiffness with normal true strength."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "74F has a new headache, scalp tenderness when combing hair, jaw fatigue while eating, and transient blurred vision. She has a migraine history. What is the next best step?",
    answers: ["Start high-dose glucocorticoids", "Treat as migraine only", "Wait for biopsy before treatment", "Give antibiotics only"],
    correct: 0,
    explanation: "Trap: migraine history should not reassure you. Suspected giant cell arteritis with visual symptoms needs immediate steroids; do not wait for biopsy."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "57F has Raynaud phenomenon, tight shiny skin over the fingers, reflux, and dysphagia. She says spicy food causes the reflux. What is the most likely diagnosis?",
    answers: ["Systemic sclerosis", "Isolated GERD", "SLE", "Osteoarthritis"],
    correct: 0,
    explanation: "Trap: reflux can be isolated, but Raynaud plus sclerodactyly and dysphagia points to systemic sclerosis."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "36M has low back pain for 8 months. He bought a new mattress, but pain is worse after rest, improves with exercise, and spinal flexion is reduced. What is the most likely diagnosis?",
    answers: ["Ankylosing spondylitis", "Mechanical back strain", "Osteoarthritis", "Gout"],
    correct: 0,
    explanation: "Trap: mattress/mechanical attribution can distract. Back pain worse with rest and improved with exercise is inflammatory, suggesting ankylosing spondylitis."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "46F carries water everywhere due to dry mouth and uses artificial tears. She has new dental caries and parotid fullness. Diabetes testing is normal. What is the most likely diagnosis?",
    answers: ["Sjögren syndrome", "Dehydration only", "Allergic conjunctivitis only", "Diabetes mellitus"],
    correct: 0,
    explanation: "Trap: thirst can suggest diabetes, but dry eyes, dry mouth, dental caries, and parotid findings point to Sjögren syndrome."
  },
  {
    topic: "Rheumatology",
    mode: "Trap",
    vignette: "53M has cough with blood-streaked sputum, palpable purpura, hematuria, and rapidly rising creatinine. He was recently told he had bronchitis. What is the most likely diagnosis?",
    answers: ["Small-vessel vasculitis with pulmonary-renal syndrome", "Isolated bronchitis", "Osteoarthritis", "Gout"],
    correct: 0,
    explanation: "Trap: bronchitis does not explain purpura, hematuria, and renal failure. Pulmonary hemorrhage plus glomerulonephritis suggests small-vessel vasculitis."
  },
    // OB/GYN — TRAP
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "26F with a positive pregnancy test has light vaginal bleeding and unilateral pelvic pain. She says it feels like a prior ovarian cyst, but she is dizzy and has shoulder-tip discomfort. What is the most likely diagnosis?",
    answers: ["Ectopic pregnancy", "Normal early pregnancy", "Endometriosis", "Pelvic inflammatory disease"],
    correct: 0,
    explanation: "Trap: prior ovarian cyst history can distract. Early pregnancy with unilateral pain, bleeding, dizziness, and shoulder-tip pain is ectopic pregnancy until proven otherwise."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "29F at 8 weeks gestation has vaginal bleeding and cramping. She passed a small clot at home, but pelvic exam shows an open cervical os. What is the most likely diagnosis?",
    answers: ["Inevitable abortion", "Threatened abortion", "Complete abortion", "Missed abortion"],
    correct: 0,
    explanation: "Trap: passing a clot does not prove complete abortion. Bleeding and cramping with an open cervical os indicates inevitable abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "31F at 9 weeks gestation has mild vaginal spotting and minimal cramping. Pelvic exam shows a closed cervical os. What is the most likely diagnosis?",
    answers: ["Threatened abortion", "Inevitable abortion", "Septic abortion", "Complete abortion"],
    correct: 0,
    explanation: "Trap: mild cramping can sound concerning, but early pregnancy bleeding with a closed cervical os is threatened abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "34F at 34 weeks gestation has painless bright red vaginal bleeding. She recently had intercourse and wonders if that caused it. Uterus is soft and nontender. What should be avoided before ultrasound?",
    answers: ["Digital cervical exam", "External fetal monitoring", "Maternal vital sign assessment", "IV access"],
    correct: 0,
    explanation: "Trap: intercourse may trigger bleeding, but painless third-trimester bleeding suggests placenta previa. Avoid digital cervical exam until placental location is confirmed."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "28F at 35 weeks gestation has vaginal bleeding, abdominal pain, uterine tenderness, and frequent contractions. She denies trauma, and the bleeding is not massive. What is the most likely diagnosis?",
    answers: ["Placental abruption", "Placenta previa", "Cervicitis", "Vasa previa"],
    correct: 0,
    explanation: "Trap: bleeding amount may be modest and trauma may be absent. Painful bleeding with uterine tenderness suggests placental abruption."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "30F at 32 weeks gestation has BP 168/110 mmHg, headache, visual spots, and RUQ pain. Urine dipstick shows only trace protein. What is the diagnosis?",
    answers: ["Preeclampsia with severe features", "Gestational hypertension only", "Normal pregnancy swelling", "Chronic migraine"],
    correct: 0,
    explanation: "Trap: trace protein does not exclude severe preeclampsia. Severe-range BP with headache, visual symptoms, and RUQ pain indicates severe features."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "27F at 38 weeks gestation has a generalized seizure. Her partner says she has been sleep-deprived, but she had headaches, visual spots, and elevated BP for several days. What medication should be given?",
    answers: ["Magnesium sulfate", "Phenytoin only", "Levetiracetam only", "Oral benzodiazepine at home"],
    correct: 0,
    explanation: "Trap: sleep deprivation can distract toward epilepsy. Seizure in the setting of hypertensive pregnancy is eclampsia, treated with magnesium sulfate."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "25F at 30 weeks gestation has contractions every 6 minutes. They improve slightly after hydration, but repeat exam shows progressive cervical dilation. What is the most likely diagnosis?",
    answers: ["Preterm labor", "Braxton Hicks contractions", "Round ligament pain", "Placenta previa"],
    correct: 0,
    explanation: "Trap: slight improvement with hydration can falsely reassure you. Regular contractions with cervical change before 37 weeks confirms preterm labor."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "32F at 41 weeks gestation reports decreased fetal movement. Nonstress test shows recurrent late decelerations. She says the baby is usually quiet at this time of day. What is the most likely cause?",
    answers: ["Uteroplacental insufficiency", "Cord compression", "Normal fetal sleep", "Maternal fever"],
    correct: 0,
    explanation: "Trap: fetal sleep cycle should not explain recurrent late decelerations. Late decelerations point to uteroplacental insufficiency."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "24F in labor has abrupt fetal heart rate decelerations that vary in timing and shape. Moderate variability is still present. What is the most likely cause?",
    answers: ["Cord compression", "Uteroplacental insufficiency", "Fetal sleep cycle", "Maternal fever"],
    correct: 0,
    explanation: "Trap: moderate variability may be reassuring overall, but abrupt variable decelerations are caused by cord compression."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "33F has heavy bleeding shortly after vaginal delivery. Placenta appears complete and no obvious lacerations are seen. Uterus is soft, enlarged, and boggy. What is the most likely cause?",
    answers: ["Uterine atony", "Cervical laceration", "Uterine inversion", "Coagulopathy only"],
    correct: 0,
    explanation: "Trap: checking for lacerations is important, but a boggy enlarged uterus is the key clue for uterine atony."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "29F has fever two days after prolonged labor and cesarean delivery. She has mild dysuria, but exam shows uterine tenderness and foul-smelling lochia. What is the most likely diagnosis?",
    answers: ["Endometritis", "Simple UTI", "Mastitis", "Normal postpartum fever"],
    correct: 0,
    explanation: "Trap: mild dysuria can distract toward UTI. Fever with uterine tenderness and foul lochia after cesarean/prolonged labor indicates endometritis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "30F who is breastfeeding has fever and a painful red wedge-shaped area on one breast. She is worried she must stop breastfeeding, but there is no fluctuance. What is the most likely diagnosis?",
    answers: ["Mastitis", "Breast abscess", "Inflammatory breast cancer", "Fibroadenoma"],
    correct: 0,
    explanation: "Trap: breastfeeding does not need to stop in uncomplicated mastitis. Fever with painful wedge-shaped erythema without fluctuance suggests mastitis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "37F has heavy irregular menstrual bleeding and an enlarged irregular uterus. She says her mother had heavy periods too. What is the most likely diagnosis?",
    answers: ["Uterine leiomyomas", "Normal familial bleeding", "Cervicitis", "Ovarian torsion"],
    correct: 0,
    explanation: "Trap: family history of heavy periods should not normalize abnormal bleeding. Enlarged irregular uterus with heavy bleeding suggests fibroids."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "52F has postmenopausal vaginal bleeding. She says it was only one small episode after intercourse. What condition must be evaluated?",
    answers: ["Endometrial cancer", "Normal menopause", "Mittelschmerz", "Premenstrual spotting"],
    correct: 0,
    explanation: "Trap: even a small episode of postmenopausal bleeding requires evaluation for endometrial cancer."
  },
    // REPRODUCTIVE / GYNECOLOGY — TRAP
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "22F has lower abdominal pain, fever, cervical motion tenderness, and mucopurulent cervical discharge. Her urine pregnancy test is negative. She says she has had cramps before. What is the most likely diagnosis?",
    answers: ["Pelvic inflammatory disease", "Primary dysmenorrhea", "Ectopic pregnancy", "Endometriosis"],
    correct: 0,
    explanation: "Trap: a negative pregnancy test rules against ectopic pregnancy but does not make pelvic pain benign. Fever, cervical motion tenderness, and discharge point to PID."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "26F has severe cyclic pelvic pain, deep dyspareunia, and infertility. Pelvic exam shows a fixed retroverted uterus. She was told painful periods are normal. What is the most likely diagnosis?",
    answers: ["Endometriosis", "Primary dysmenorrhea", "Pelvic inflammatory disease", "Ovarian torsion"],
    correct: 0,
    explanation: "Trap: painful menses should not be normalized when severe pain, dyspareunia, infertility, and fixed uterus are present. This suggests endometriosis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "17F has never had menses. Breast development is normal, but cyclic pelvic pain is worsening monthly. Exam shows a bulging bluish hymenal membrane. What is the most likely diagnosis?",
    answers: ["Imperforate hymen", "Turner syndrome", "Pregnancy", "PCOS"],
    correct: 0,
    explanation: "Trap: normal breast development means estrogen is present. Primary amenorrhea with cyclic pain and bulging hymen suggests outflow obstruction from imperforate hymen."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "16F has primary amenorrhea, normal breast development, scant pubic hair, and a blind-ending vagina. She is embarrassed and avoids pelvic exams. What is the most likely diagnosis?",
    answers: ["Androgen insensitivity syndrome", "Turner syndrome", "PCOS", "Asherman syndrome"],
    correct: 0,
    explanation: "Trap: normal breasts with scant pubic hair and absent uterus/vaginal canal points to androgen insensitivity, not Turner syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "32F has secondary amenorrhea after a postpartum hemorrhage requiring transfusion. She also cannot lactate and has fatigue. Pregnancy test is negative. What is the most likely diagnosis?",
    answers: ["Sheehan syndrome", "PCOS", "Normal postpartum delay", "Premature ovarian failure"],
    correct: 0,
    explanation: "Trap: postpartum amenorrhea can be normal, but hemorrhage plus failure to lactate suggests pituitary infarction from Sheehan syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "24F has amenorrhea, galactorrhea, headaches, and decreased libido. Pregnancy test is negative. She recently started exercising. What is the most likely diagnosis?",
    answers: ["Hyperprolactinemia", "Athletic amenorrhea only", "Ectopic pregnancy", "Menopause"],
    correct: 0,
    explanation: "Trap: exercise can distract, but galactorrhea with amenorrhea and headaches suggests hyperprolactinemia."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "31F has vaginal itching and thick white discharge. Vaginal pH is normal. She recently completed antibiotics for sinusitis. What is the most likely diagnosis?",
    answers: ["Vulvovaginal candidiasis", "Bacterial vaginosis", "Trichomoniasis", "Chlamydia"],
    correct: 0,
    explanation: "Trap: discharge after antibiotics with normal pH points to Candida, not bacterial vaginosis or trichomoniasis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "29F has thin gray vaginal discharge with fishy odor. Vaginal pH is elevated. She has no pelvic pain or fever. What is the most likely diagnosis?",
    answers: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Pelvic inflammatory disease", "Endometriosis"],
    correct: 0,
    explanation: "Trap: absence of pain and fever should steer away from PID. Fishy odor with elevated pH points to bacterial vaginosis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "27F has frothy yellow-green vaginal discharge, vulvar irritation, and a strawberry cervix. Her partner has mild urethral irritation. What is the most likely diagnosis?",
    answers: ["Trichomoniasis", "Bacterial vaginosis", "Candidiasis", "Atrophic vaginitis"],
    correct: 0,
    explanation: "Trap: vaginal discharge with partner symptoms suggests an STI. Frothy green discharge and strawberry cervix point to trichomoniasis."
  },
  {
    topic: "OB/GYN",
    mode: "Trap",
    vignette: "23F requests emergency contraception 3 days after unprotected intercourse. She says it may be too late. What is the most effective option?",
    answers: ["Copper IUD", "Combined oral contraceptive pills only", "No option after 24 hours", "Depot medroxyprogesterone injection"],
    correct: 0,
    explanation: "Trap: emergency contraception is not limited to 24 hours. Copper IUD is the most effective option within 5 days."
  },

  // PEDIATRICS — TRAP
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "2-week-old has projectile nonbilious vomiting after feeds and is still hungry afterward. Parents think it is reflux. What is the most likely diagnosis?",
    answers: ["Hypertrophic pyloric stenosis", "GERD", "Malrotation with volvulus", "Hirschsprung disease"],
    correct: 0,
    explanation: "Trap: reflux is common, but projectile nonbilious vomiting with hunger after vomiting in an infant suggests pyloric stenosis."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "A newborn has bilious vomiting and abdominal distension. The nurse says he passed some meconium earlier. What is the most concerning diagnosis?",
    answers: ["Malrotation with volvulus", "Physiologic reflux", "Pyloric stenosis", "Colic"],
    correct: 0,
    explanation: "Trap: any bilious vomiting in a newborn is obstruction until proven otherwise. Passing some meconium does not rule out malrotation with volvulus."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "6-week-old has fever 38.6°C but is feeding reasonably well and looks calm in the room. What is the next best step?",
    answers: ["Full evaluation for serious bacterial infection", "Reassurance only", "Antipyretics and discharge", "Routine vaccine visit"],
    correct: 0,
    explanation: "Trap: well appearance does not make fever safe in young infants. Fever in a 6-week-old requires evaluation for serious bacterial infection."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "3-year-old has sudden barking cough, inspiratory stridor, and low-grade fever. Symptoms are worse at night. Parents worry because he is wheezing. What is the most likely diagnosis?",
    answers: ["Croup", "Asthma", "Epiglottitis", "Foreign body aspiration"],
    correct: 0,
    explanation: "Trap: parents may call any noisy breathing wheezing. Barking cough with inspiratory stridor and nocturnal worsening suggests croup."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "4-year-old is drooling, sitting forward, refusing to lie down, and has high fever with muffled voice. He has not received routine vaccines. What should be avoided initially?",
    answers: ["Aggressive throat examination", "Airway preparation", "IV antibiotics after airway secured", "Calling anesthesia"],
    correct: 0,
    explanation: "Trap: sore throat exam can be dangerous in suspected epiglottitis. Drooling, tripod posture, muffled voice, and underimmunization require airway-focused management."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "18-month-old has episodic severe crying, draws knees to chest, vomits, and has currant jelly stool. Between episodes he appears tired but less distressed. What is the most likely diagnosis?",
    answers: ["Intussusception", "Gastroenteritis", "Constipation", "Pyloric stenosis"],
    correct: 0,
    explanation: "Trap: intermittent improvement should not reassure you. Episodic colicky pain with currant jelly stool suggests intussusception."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "Newborn fails to pass meconium in the first 48 hours and develops abdominal distension. Rectal exam causes explosive stool. What is the most likely diagnosis?",
    answers: ["Hirschsprung disease", "Normal delayed stooling", "Pyloric stenosis", "GERD"],
    correct: 0,
    explanation: "Trap: delayed meconium should not be dismissed. Explosive stool after rectal exam suggests Hirschsprung disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "5-year-old has periorbital edema and frothy urine after a recent viral illness. Urinalysis shows 4+ protein and no blood. What is the most likely diagnosis?",
    answers: ["Minimal change disease", "Poststreptococcal glomerulonephritis", "IgA nephropathy", "UTI"],
    correct: 0,
    explanation: "Trap: recent illness can distract toward nephritic syndromes. Heavy proteinuria without hematuria in a child suggests minimal change disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "8-year-old develops tea-colored urine, periorbital edema, hypertension, and low complement 2 weeks after impetigo. What is the most likely diagnosis?",
    answers: ["Poststreptococcal glomerulonephritis", "Minimal change disease", "IgA nephropathy", "Nephrolithiasis"],
    correct: 0,
    explanation: "Trap: skin infection may seem unrelated. Nephritic findings 1–3 weeks after strep skin infection with low complement suggest PSGN."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "10-year-old has brief staring spells many times daily with immediate return to baseline. Teacher thinks he is daydreaming. What is the most likely diagnosis?",
    answers: ["Absence seizures", "ADHD", "Syncope", "Complex partial seizures"],
    correct: 0,
    explanation: "Trap: frequent brief staring spells are often mislabeled as inattention. Abrupt episodes with immediate recovery suggest absence seizures."
  },
    // PEDIATRICS — TRAP CONTINUED
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "7-year-old has fever, migratory joint pain, new murmur, and a recent untreated sore throat. Parent says the throat pain resolved weeks ago. What is the most likely diagnosis?",
    answers: ["Acute rheumatic fever", "Juvenile idiopathic arthritis", "Viral arthritis", "Septic arthritis"],
    correct: 0,
    explanation: "Trap: resolution of sore throat does not exclude post-streptococcal complications. Migratory arthritis with new murmur after pharyngitis suggests acute rheumatic fever."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "6-year-old has fever for 6 days, conjunctival injection, cracked lips, swollen hands, rash, and cervical lymphadenopathy. Rapid strep test is negative. What is the next best treatment?",
    answers: ["IVIG and aspirin", "Amoxicillin only", "Reassurance only", "Topical eye drops"],
    correct: 0,
    explanation: "Trap: negative strep test should not stop you. Prolonged fever with mucocutaneous findings suggests Kawasaki disease, treated with IVIG and aspirin."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "9-month-old has a high fever for 4 days that resolves, followed by a diffuse pink maculopapular rash. Parents worry the rash means the illness is worsening. What is the most likely diagnosis?",
    answers: ["Roseola", "Measles", "Scarlet fever", "Varicella"],
    correct: 0,
    explanation: "Trap: rash after fever resolution is classic for roseola and does not mean deterioration."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "4-year-old has slapped-cheek rash followed by lacy rash on the trunk and arms. He feels well now. The mother is pregnant. What virus is most likely?",
    answers: ["Parvovirus B19", "Varicella-zoster virus", "Measles virus", "Rubella virus"],
    correct: 0,
    explanation: "Trap: a well-appearing child with rash can seem trivial, but parvovirus B19 matters because fetal anemia/hydrops risk exists in pregnancy."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "2-year-old has painless rectal bleeding with maroon stool. Abdomen is soft and nontender. Parent thinks it is from constipation. What is the most likely diagnosis?",
    answers: ["Meckel diverticulum", "Anal fissure", "Intussusception", "Necrotizing enterocolitis"],
    correct: 0,
    explanation: "Trap: constipation usually causes painful bright red streaking. Painless lower GI bleeding in a young child suggests Meckel diverticulum."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "13-year-old has anterior knee pain and tenderness over the tibial tubercle after basketball. X-ray shows no fracture. What is the most likely diagnosis?",
    answers: ["Osgood-Schlatter disease", "Septic arthritis", "ACL tear", "Slipped capital femoral epiphysis"],
    correct: 0,
    explanation: "Trap: normal x-ray should not make you ignore tibial tubercle pain in an adolescent athlete. This is Osgood-Schlatter disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "12-year-old overweight boy has hip pain, but points mostly to his knee. He walks with an antalgic gait. He denies trauma. What is the most likely diagnosis?",
    answers: ["Slipped capital femoral epiphysis", "Patellar tendinitis", "Osgood-Schlatter disease", "Transient synovitis"],
    correct: 0,
    explanation: "Trap: knee pain can be referred from the hip. Overweight adolescent with limp and hip/knee pain suggests SCFE."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "A toddler refuses to use his arm after being pulled up by the hand. The elbow x-ray is normal. What is the most likely diagnosis?",
    answers: ["Nursemaid elbow", "Supracondylar fracture", "Septic arthritis", "Osteomyelitis"],
    correct: 0,
    explanation: "Trap: a normal x-ray does not exclude nursemaid elbow. Traction injury with refusal to use the arm suggests radial head subluxation."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "8-month-old has bruises on the trunk, different stages of healing, and a spiral femur fracture. Caregiver says the baby rolled off the couch. What is the most likely diagnosis?",
    answers: ["Nonaccidental trauma", "Osteogenesis imperfecta", "Normal infant bruising", "Rickets"],
    correct: 0,
    explanation: "Trap: caregiver explanation may be offered confidently, but inconsistent mechanism with suspicious bruising/fractures suggests nonaccidental trauma."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "3-year-old has repeated sinopulmonary infections, chronic diarrhea, and poor growth. Parents think he is just in daycare often. What should be suspected?",
    answers: ["Primary immunodeficiency", "Normal daycare infections only", "Asthma only", "Iron deficiency"],
    correct: 0,
    explanation: "Trap: daycare infections are common, but recurrent severe infections plus diarrhea and failure to thrive suggest primary immunodeficiency."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "15-year-old has fatigue, weight loss, polyuria, polydipsia, abdominal pain, Kussmaul respirations, and fruity breath. Parents think it is a stomach virus. What is the most likely diagnosis?",
    answers: ["Diabetic ketoacidosis", "Viral gastroenteritis", "Appendicitis", "Eating disorder"],
    correct: 0,
    explanation: "Trap: vomiting and abdominal pain can mimic gastroenteritis, but polyuria, polydipsia, Kussmaul respirations, and fruity breath indicate DKA."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "Newborn has poor feeding, vomiting, lethargy, and ambiguous genitalia. Sodium is low and potassium is high. What is the most likely diagnosis?",
    answers: ["Congenital adrenal hyperplasia", "Pyloric stenosis", "Sepsis only", "Turner syndrome"],
    correct: 0,
    explanation: "Trap: newborn vomiting can mimic GI disease or sepsis, but ambiguous genitalia with hyponatremia and hyperkalemia suggests salt-wasting CAH."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "5-year-old has recurrent wheezing and cough at night. Symptoms worsen with exercise and improve with albuterol. Exam is normal today. What is the most likely diagnosis?",
    answers: ["Asthma", "Viral URI only", "Foreign body aspiration", "Cystic fibrosis"],
    correct: 0,
    explanation: "Trap: a normal exam between episodes does not exclude asthma. Nocturnal/exercise symptoms with albuterol response suggest asthma."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "2-year-old has sudden coughing and unilateral wheezing while playing with peanuts. Parent says he has had colds recently. What is the most likely diagnosis?",
    answers: ["Foreign body aspiration", "Asthma", "Bronchiolitis", "Croup"],
    correct: 0,
    explanation: "Trap: recent colds can distract. Sudden cough with unilateral wheeze during eating/playing suggests foreign body aspiration."
  },
  {
    topic: "Pediatrics",
    mode: "Trap",
    vignette: "6-month-old has cough, wheezing, tachypnea, and diffuse crackles during winter. Older sibling recently had a runny nose. What is the most likely diagnosis?",
    answers: ["Bronchiolitis", "Asthma", "Croup", "Epiglottitis"],
    correct: 0,
    explanation: "Trap: wheeze in an infant is not automatically asthma. Winter viral prodrome with diffuse lower airway findings suggests bronchiolitis."
  },
    // SURGERY — TRAP
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "22M has periumbilical pain that migrated to the RLQ with anorexia, nausea, fever, and rebound tenderness. He says the pain improved briefly after vomiting. What is the most likely diagnosis?",
    answers: ["Acute appendicitis", "Viral gastroenteritis", "Constipation", "IBS"],
    correct: 0,
    explanation: "Trap: brief improvement after vomiting should not reassure you. Migratory RLQ pain with fever and rebound tenderness suggests acute appendicitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "74F has severe abdominal pain out of proportion to exam, atrial fibrillation, and bloody diarrhea. Initial abdominal exam is soft. What is the most likely diagnosis?",
    answers: ["Acute mesenteric ischemia", "Viral gastroenteritis", "Diverticulosis", "IBS"],
    correct: 0,
    explanation: "Trap: a soft abdomen early should not reassure you. Pain out of proportion with atrial fibrillation suggests acute mesenteric ischemia."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "61M has sudden severe epigastric pain, rigid abdomen, and free air under the diaphragm. He took antacids before arrival with no relief. What is the most likely diagnosis?",
    answers: ["Perforated peptic ulcer", "GERD", "Biliary colic", "Viral gastritis"],
    correct: 0,
    explanation: "Trap: epigastric pain is not always reflux. Peritonitis with free intraperitoneal air indicates perforated viscus, commonly perforated peptic ulcer."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "56F has RUQ pain, fever, jaundice, and confusion. She says she has had gallstone pain before that resolved. What is the most likely diagnosis?",
    answers: ["Ascending cholangitis", "Biliary colic", "GERD", "Hepatitis A"],
    correct: 0,
    explanation: "Trap: prior biliary colic can distract. Fever, jaundice, RUQ pain, and confusion suggest ascending cholangitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "65M has abdominal distension, vomiting, constipation, and high-pitched bowel sounds after prior abdominal surgery. He passed a small amount of gas this morning. What is the most likely diagnosis?",
    answers: ["Small bowel obstruction", "IBS", "Viral gastroenteritis", "Uncomplicated constipation"],
    correct: 0,
    explanation: "Trap: passing a small amount of gas does not exclude obstruction. Prior surgery with distension, vomiting, constipation, and high-pitched sounds suggests SBO."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "70M has a pulsatile abdominal mass, back pain, hypotension, and syncope. He says he has chronic back pain. What is the most likely diagnosis?",
    answers: ["Ruptured abdominal aortic aneurysm", "Lumbar strain", "Renal colic", "Pancreatitis"],
    correct: 0,
    explanation: "Trap: chronic back pain history should not reassure you. Hypotension with pulsatile abdominal mass and back pain suggests ruptured AAA."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "27M has testicular pain that began suddenly 2 hours ago with nausea. The affected testis is high-riding and cremasteric reflex is absent. Urinalysis is normal. What is the next best step?",
    answers: ["Urgent surgical exploration", "Antibiotics only", "Scrotal support and discharge", "Routine outpatient ultrasound next week"],
    correct: 0,
    explanation: "Trap: normal urinalysis should not reassure you. Sudden testicular pain with high-riding testis and absent cremasteric reflex is torsion until proven otherwise."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "60M has fever, perineal pain, swelling, crepitus, and rapidly spreading erythema after a minor skin injury. What is the most likely diagnosis?",
    answers: ["Necrotizing fasciitis", "Simple cellulitis", "Contact dermatitis", "Tinea cruris"],
    correct: 0,
    explanation: "Trap: minor skin injury can seem harmless. Crepitus, severe pain, systemic toxicity, and rapid spread suggest necrotizing fasciitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient develops severe pain, pallor, paresthesia, pulselessness, and poikilothermia in the leg. He says it started after sleeping awkwardly. What is the most likely diagnosis?",
    answers: ["Acute limb ischemia", "Muscle strain", "Sciatica", "Cellulitis"],
    correct: 0,
    explanation: "Trap: positional story can distract. The 6 Ps indicate acute limb ischemia, which is a vascular emergency."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A postoperative patient has sudden dyspnea, pleuritic chest pain, tachycardia, and hypoxemia. Chest x-ray is clear. What is the most likely diagnosis?",
    answers: ["Pulmonary embolism", "Atelectasis only", "Pneumonia", "Panic attack"],
    correct: 0,
    explanation: "Trap: clear chest x-ray does not exclude PE. Postoperative state with acute pleuritic dyspnea and hypoxemia suggests pulmonary embolism."
  },

  // EMERGENCY MEDICINE — TRAP
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A trauma patient has hypotension, unilateral absent breath sounds, distended neck veins, and tracheal deviation. The team asks for a chest x-ray. What is the next best step?",
    answers: ["Immediate needle decompression", "Wait for chest x-ray", "CT chest with contrast", "Nebulized bronchodilator"],
    correct: 0,
    explanation: "Trap: do not wait for imaging in tension pneumothorax. Obstructive shock with unilateral absent breath sounds requires immediate decompression."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A trauma patient has hypotension, muffled heart sounds, and JVD after a stab wound to the chest. Breath sounds are equal. What is the most likely diagnosis?",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Flail chest", "Simple pneumothorax"],
    correct: 0,
    explanation: "Trap: chest trauma plus shock can tempt pneumothorax, but equal breath sounds with Beck triad suggests cardiac tamponade."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A burn patient has facial burns, singed nasal hairs, hoarseness, and carbonaceous sputum. Oxygen saturation is currently normal. What is the next best step?",
    answers: ["Early endotracheal intubation", "Observe because oxygen saturation is normal", "Discharge with inhaler", "Delay airway management until stridor develops"],
    correct: 0,
    explanation: "Trap: normal oxygen saturation does not rule out impending airway edema or inhalation injury. Hoarseness and soot require early airway protection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient is found in a house fire with headache, confusion, and cherry-red skin. Pulse oximetry reads 99%. What treatment is needed?",
    answers: ["High-flow oxygen", "Reassurance based on pulse oximetry", "Nebulized albuterol only", "Antibiotics"],
    correct: 0,
    explanation: "Trap: pulse oximetry can appear normal in carbon monoxide poisoning. Treat suspected CO poisoning with high-flow oxygen."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient has suspected opioid overdose with slow respirations, pinpoint pupils, and altered mental status. A friend says he may just be sleeping. What medication should be given?",
    answers: ["Naloxone", "Flumazenil", "Activated charcoal only", "Haloperidol"],
    correct: 0,
    explanation: "Trap: do not accept sleep as an explanation for respiratory depression. Opioid toxidrome requires naloxone and airway support."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient took an unknown amount of acetaminophen 10 hours ago. He feels well and liver enzymes are normal. What is the next best step?",
    answers: ["Check acetaminophen level and treat if indicated", "Reassure because symptoms are absent", "Wait for jaundice", "Give flumazenil"],
    correct: 0,
    explanation: "Trap: early acetaminophen toxicity can be asymptomatic with normal LFTs. Use level/timing and start N-acetylcysteine when indicated."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient has agitation, hyperthermia, diaphoresis, diarrhea, tremor, and inducible clonus after starting a new antidepressant. What is the most likely diagnosis?",
    answers: ["Serotonin syndrome", "Neuroleptic malignant syndrome", "Opioid withdrawal", "Panic attack"],
    correct: 0,
    explanation: "Trap: fever and agitation can suggest NMS, but clonus, hyperreflexia, diarrhea, and serotonergic exposure point to serotonin syndrome."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient taking antipsychotics has fever, severe lead-pipe rigidity, altered mental status, and elevated CK. Reflexes are not hyperactive. What is the most likely diagnosis?",
    answers: ["Neuroleptic malignant syndrome", "Serotonin syndrome", "Panic attack", "Alcohol withdrawal"],
    correct: 0,
    explanation: "Trap: both NMS and serotonin syndrome can cause fever, but lead-pipe rigidity with antipsychotic exposure and elevated CK suggests NMS."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient has severe crushing chest pain radiating to the left arm. ECG shows ST elevations in II, III, and aVF with hypotension and clear lungs. What medication should be avoided?",
    answers: ["Nitroglycerin", "Aspirin", "Heparin", "High-intensity statin"],
    correct: 0,
    explanation: "Trap: chest pain protocols often include nitroglycerin, but inferior STEMI with hypotension and clear lungs suggests RV infarct; avoid preload reduction."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trap",
    vignette: "A patient has anaphylaxis with wheezing, hypotension, urticaria, and throat tightness after eating peanuts. Family asks for diphenhydramine first because it helped hives before. What is the first-line treatment?",
    answers: ["Intramuscular epinephrine", "Diphenhydramine only", "Oral prednisone only", "Nebulized albuterol only"],
    correct: 0,
    explanation: "Trap: antihistamines may help hives but do not treat airway edema or shock. Anaphylaxis requires IM epinephrine first."
  },
    // PREVENTIVE MEDICINE — TRAP
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "52F asks when she should start colon cancer screening. She feels well, has no bleeding, and has no family history of colon cancer. What is the best recommendation?",
    answers: ["Begin colorectal cancer screening now", "Wait until symptoms develop", "Begin at age 65", "Screen only if anemia develops"],
    correct: 0,
    explanation: "Trap: absence of symptoms does not mean no screening. Average-risk adults should undergo age-appropriate colorectal cancer screening."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "62M smoked 1 pack per day for 35 years and quit 8 years ago. He has no cough and feels well. What screening should be offered?",
    answers: ["Low-dose CT chest", "Chest x-ray only", "No screening because he quit", "Sputum cytology"],
    correct: 0,
    explanation: "Trap: lack of symptoms and smoking cessation do not eliminate screening need. Eligible heavy smokers who quit recently should be offered low-dose CT screening."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "66M has smoked for decades. He has never had abdominal imaging and feels well. What screening should be offered once?",
    answers: ["Abdominal ultrasound for AAA", "CT angiography every year", "No screening if asymptomatic", "Serum aneurysm marker"],
    correct: 0,
    explanation: "Trap: AAA screening is not symptom-driven. Older men with a smoking history should receive one-time abdominal ultrasound screening."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "23F has completed HPV vaccination and asks whether she still needs cervical cancer screening in the future. What is the correct advice?",
    answers: ["Screen according to age guidelines", "No Pap testing is ever needed", "Screen only if symptomatic", "Screen only after pregnancy"],
    correct: 0,
    explanation: "Trap: HPV vaccination reduces risk but does not eliminate cervical cancer screening. Continue age-appropriate screening."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "70F has never received pneumococcal vaccination. She says she rarely gets infections and wants to skip it. What is the best recommendation?",
    answers: ["Recommend pneumococcal vaccination", "Skip because she is healthy", "Give only if hospitalized", "Give only after pneumonia"],
    correct: 0,
    explanation: "Trap: vaccination is preventive, not dependent on frequent infections. Older adults should receive indicated pneumococcal vaccination."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "29F is pregnant during influenza season and worries the flu shot will harm the fetus. What is the best recommendation?",
    answers: ["Give inactivated influenza vaccine", "Avoid all influenza vaccines", "Delay until postpartum only", "Give live intranasal vaccine"],
    correct: 0,
    explanation: "Trap: pregnancy is not a reason to avoid inactivated flu vaccine. Pregnant patients should receive inactivated influenza vaccination."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "45M has BP 148/94 mmHg at one visit. He feels anxious in clinic and says his home readings are normal. What is the best next step?",
    answers: ["Confirm with repeat or out-of-office measurements", "Diagnose hypertension from one reading only", "Ignore permanently", "Start IV antihypertensives"],
    correct: 0,
    explanation: "Trap: one elevated office reading is not enough for routine hypertension diagnosis. Confirm with repeat measurements or ambulatory/home readings."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "37F with obesity asks for weight-loss medication. She drinks sugar-sweetened beverages daily and does not exercise. What should management include first-line?",
    answers: ["Lifestyle intervention with diet and physical activity", "Medication without lifestyle change", "Bariatric surgery immediately for all patients", "Reassurance only"],
    correct: 0,
    explanation: "Trap: medications can help selected patients, but lifestyle intervention remains foundational for obesity management."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "58M has diabetes and LDL 142 mg/dL. He says he eats carefully and does not want cholesterol medication because he has no chest pain. What should be recommended?",
    answers: ["Statin therapy", "No therapy unless chest pain develops", "Antibiotics", "Aspirin only"],
    correct: 0,
    explanation: "Trap: lipid prevention is based on risk, not symptoms. Diabetes in this age group is an indication for statin therapy unless contraindicated."
  },
  {
    topic: "Preventive Medicine",
    mode: "Trap",
    vignette: "41F asks whether mammography is needed because she has no breast lump and no family history. What is the correct counseling point?",
    answers: ["Screening is based on age and risk, not symptoms alone", "Screen only if a lump appears", "Screen only with family history", "Never screen average-risk patients"],
    correct: 0,
    explanation: "Trap: absence of symptoms does not remove the role of screening. Mammography is offered according to age and risk guidelines."
  },

  // ETHICS / QUALITY / PATIENT SAFETY — TRAP
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A competent adult refuses a recommended blood transfusion after risks, benefits, and alternatives are explained. The team thinks the refusal is unwise. What should be done?",
    answers: ["Respect the patient's informed refusal", "Transfuse because the team disagrees", "Ask family to override the patient", "Call security to force treatment"],
    correct: 0,
    explanation: "Trap: disagreement with the patient's choice does not remove autonomy. A capacitated patient can refuse recommended treatment."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "An unconscious patient needs emergency surgery to stop life-threatening bleeding. No surrogate is available. What is the appropriate consent approach?",
    answers: ["Proceed under implied consent", "Delay until written consent is found", "Ask a neighbor to sign", "Do nothing until court order"],
    correct: 0,
    explanation: "Trap: consent is not required to delay life-saving emergency care when the patient lacks capacity and no surrogate is available. Implied consent applies."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient with schizophrenia calmly explains the risks and benefits of surgery and gives a consistent choice. The intern thinks psychiatric illness means incapacity. What is the correct conclusion?",
    answers: ["Psychiatric diagnosis alone does not remove capacity", "All patients with schizophrenia lack capacity", "Only family can decide", "Court order is always needed"],
    correct: 0,
    explanation: "Trap: capacity is decision-specific and not determined by diagnosis alone. If the patient understands, appreciates, reasons, and communicates a choice, capacity may be present."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A medication error reaches the patient but causes no harm. The resident suggests not mentioning it because the patient is fine. What is the appropriate action?",
    answers: ["Disclose the error honestly", "Hide it because there was no harm", "Blame the nurse", "Delete the order history"],
    correct: 0,
    explanation: "Trap: no harm does not justify concealment. Errors that reach patients should be disclosed honestly with appropriate institutional reporting."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient asks not to be told her cancer diagnosis and says all information should go to her son. She is calm and appears to understand the implications. What should the physician do?",
    answers: ["Honor the patient's preference not to receive details", "Force full disclosure immediately", "Tell the son only after ignoring the patient", "Discharge the patient from care"],
    correct: 0,
    explanation: "Trap: autonomy includes the right not to know. A capacitated patient may designate someone else to receive information."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A teenage patient requests contraception. Her parent demands to know every detail of the visit. Local law allows confidential reproductive care. What should the physician do?",
    answers: ["Protect the adolescent's confidentiality within legal limits", "Tell the parent everything", "Refuse to provide care", "Call police"],
    correct: 0,
    explanation: "Trap: parental concern does not automatically override adolescent confidentiality for protected services. Follow local law and confidentiality rules."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient with active suicidal intent, plan, and access to a firearm asks the physician to keep it secret. What is the next best step?",
    answers: ["Ensure safety with emergency psychiatric evaluation", "Promise absolute confidentiality", "Schedule routine follow-up", "Give reassurance only"],
    correct: 0,
    explanation: "Trap: confidentiality has limits when there is imminent risk of serious harm. Active suicidal intent requires urgent safety intervention."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient says he plans to kill a specific coworker and has access to a weapon. He asks the physician not to tell anyone. What is required?",
    answers: ["Take steps to protect the identifiable target", "Maintain absolute confidentiality", "Ignore it unless violence occurs", "Only document and do nothing"],
    correct: 0,
    explanation: "Trap: confidentiality is limited when a specific threat to an identifiable person exists. The physician must take protective action according to law."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A family asks the physician not to tell a competent patient about a serious diagnosis because it will upset him. What should the physician do first?",
    answers: ["Ask the patient how much information he wants", "Follow the family's request automatically", "Lie to the patient", "Avoid the patient"],
    correct: 0,
    explanation: "Trap: family wishes do not override a competent patient's right to information. First assess the patient's own preferences."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "An interpreter is needed for a complex consent discussion. The patient's bilingual child offers to translate. What is the best approach?",
    answers: ["Use a professional medical interpreter", "Use the child for convenience", "Proceed without interpretation", "Speak louder in English"],
    correct: 0,
    explanation: "Trap: family members may be convenient but are not ideal for complex medical consent. Use a professional interpreter."
  },
    // BIOSTATISTICS / EPIDEMIOLOGY — TRAP
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A screening test has very high sensitivity but modest specificity. A student says a positive result confirms disease. What is the correct interpretation?",
    answers: ["A negative result is useful for ruling out disease", "A positive result always confirms disease", "Sensitivity determines false positives", "Specificity determines false negatives"],
    correct: 0,
    explanation: "Trap: high sensitivity is best for ruling out disease when the test is negative. Positive results are more confirmatory when specificity is high."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A diagnostic test has very high specificity. The patient tests positive. A student says specificity only helps with negative tests. What is the correct interpretation?",
    answers: ["A positive result is useful for ruling in disease", "A negative result proves disease", "Specificity measures true positives", "Sensitivity measures false positives"],
    correct: 0,
    explanation: "Trap: high specificity helps rule in disease when the test is positive. Use SpPin: specificity-positive-rules in."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A rare disease screening test has 99% sensitivity and 95% specificity. A patient with no risk factors tests positive. The intern says the patient almost certainly has the disease. What concept explains why this may be wrong?",
    answers: ["Low positive predictive value", "High negative predictive value", "High relative risk", "Low sensitivity"],
    correct: 0,
    explanation: "Trap: even good tests can have many false positives when disease prevalence is low. Low prevalence lowers positive predictive value."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A study finds a relative risk of 2.0 for a disease, but the baseline risk is 1 in 10,000. A headline says the risk doubled and is now very common. What measure best clarifies clinical impact?",
    answers: ["Absolute risk increase", "P value only", "Sensitivity", "Specificity"],
    correct: 0,
    explanation: "Trap: relative risk can sound dramatic when baseline risk is tiny. Absolute risk increase better communicates real-world impact."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A randomized trial reports p = 0.03 for a small difference in symptom score. The team says this proves the effect is clinically important. What is the correct interpretation?",
    answers: ["Statistical significance does not prove clinical importance", "P value gives effect size", "P value gives probability the null is true", "P value proves no bias exists"],
    correct: 0,
    explanation: "Trap: statistical significance only suggests the result is unlikely under the null model. It does not automatically mean the effect is clinically meaningful."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A trial has a confidence interval for risk ratio of 0.78 to 1.24. The authors emphasize that the point estimate favors treatment. What is the correct conclusion?",
    answers: ["The result is not statistically significant", "The treatment is definitely beneficial", "The treatment is definitely harmful", "The study proves equivalence"],
    correct: 0,
    explanation: "Trap: a favorable point estimate is not enough. For a risk ratio, a confidence interval crossing 1 is not statistically significant."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A case-control study compares prior pesticide exposure in patients with Parkinson disease versus controls. A student wants to calculate incidence. What measure is most appropriate?",
    answers: ["Odds ratio", "Relative risk", "Incidence rate", "Attributable risk"],
    correct: 0,
    explanation: "Trap: case-control studies start with disease status and look backward, so incidence and relative risk are generally not directly calculated. Use odds ratio."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A cohort study follows smokers and nonsmokers for 10 years to compare new lung cancer diagnoses. What measure is most appropriate?",
    answers: ["Relative risk", "Odds ratio only", "Sensitivity", "Number needed to screen"],
    correct: 0,
    explanation: "Trap: do not default to odds ratio for every study. Cohort studies follow exposure groups over time and can directly estimate risk and relative risk."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A study of a new medication excludes patients who stopped the drug because of side effects. The medication appears highly effective. What bias is most likely?",
    answers: ["Attrition bias", "Lead-time bias", "Recall bias", "Observer bias"],
    correct: 0,
    explanation: "Trap: removing patients who discontinue treatment can make the intervention look better than it is. Loss or exclusion after enrollment creates attrition bias."
  },
  {
    topic: "Biostatistics/Epidemiology",
    mode: "Trap",
    vignette: "A cancer screening program appears to improve 5-year survival, but mortality is unchanged. What bias best explains this?",
    answers: ["Lead-time bias", "Recall bias", "Selection bias", "Hawthorne effect"],
    correct: 0,
    explanation: "Trap: earlier diagnosis can increase measured survival time without delaying death. Unchanged mortality suggests lead-time bias."
  },

  // SYSTEMS-BASED PRACTICE / QUALITY IMPROVEMENT — TRAP
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A hospital sees frequent wrong-dose insulin orders. Leadership wants to punish the last resident who made the error. What is the best systems-based response?",
    answers: ["Analyze workflow and implement safer ordering systems", "Punish only the last prescriber", "Hide the errors from staff", "Ban insulin use"],
    correct: 0,
    explanation: "Trap: repeated errors usually reflect system vulnerabilities, not just one bad clinician. Use root-cause analysis and safer processes."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A nurse almost gives a medication to the wrong patient but catches the error before administration. The team says no report is needed because no harm occurred. What should be done?",
    answers: ["Report the near miss", "Ignore it because no harm occurred", "Punish the nurse", "Delete the order"],
    correct: 0,
    explanation: "Trap: near misses are valuable safety signals. Reporting them helps identify system problems before patients are harmed."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "Two patients with similar names are placed in adjacent rooms, and lab samples are nearly mislabeled. What intervention best addresses the problem?",
    answers: ["Use two patient identifiers before labeling specimens", "Tell staff to be more careful only", "Stop ordering labs", "Use room number as the only identifier"],
    correct: 0,
    explanation: "Trap: telling people to be careful is weak system design. Two identifiers reduce wrong-patient errors."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A central line infection cluster occurs in the ICU. One senior physician says experienced clinicians do not need checklists. What intervention is most appropriate?",
    answers: ["Implement a central-line insertion checklist and sterile bundle", "Rely on experience alone", "Stop tracking infections", "Use antibiotics for all line placements indefinitely"],
    correct: 0,
    explanation: "Trap: expertise does not replace standardized safety bundles. Checklists reduce preventable central-line infections."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient is discharged on two medications with dangerous interaction because multiple teams wrote separate plans. What safety tool would best reduce this risk?",
    answers: ["Medication reconciliation", "More abbreviations", "Verbal-only discharge plans", "Avoid involving pharmacists"],
    correct: 0,
    explanation: "Trap: transitions of care are high-risk. Medication reconciliation helps detect duplications, omissions, and interactions."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A surgeon marks the wrong side on a consent form, but the patient verbally states the correct side before the operation. What should occur before incision?",
    answers: ["Surgical time-out with verification", "Proceed because the surgeon is experienced", "Ignore the mismatch", "Ask only the medical student"],
    correct: 0,
    explanation: "Trap: verbal memory is not enough when documentation conflicts. A formal time-out verifies patient, procedure, and site."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "Residents frequently miss abnormal lab results that return after shift change. One resident says each person should just check harder. What is the best intervention?",
    answers: ["Standardized handoff with closed-loop follow-up", "Tell residents to remember better", "Stop ordering labs near shift change", "Ignore noncritical labs"],
    correct: 0,
    explanation: "Trap: handoff failures are system problems. Standardized handoffs and closed-loop communication reduce missed results."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A medication order is misunderstood because the prescriber used an unsafe abbreviation. The prescriber says everyone knows what it means. What is the best response?",
    answers: ["Eliminate unsafe abbreviations", "Keep using abbreviations for speed", "Blame the pharmacist only", "Use handwriting instead of electronic orders"],
    correct: 0,
    explanation: "Trap: familiarity does not make unsafe abbreviations safe. Standardizing clear medication orders prevents interpretation errors."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A patient deteriorates overnight, but the covering team was not notified because everyone assumed someone else had called. What communication principle was missing?",
    answers: ["Closed-loop communication", "Patient autonomy", "Blinding", "Allocation concealment"],
    correct: 0,
    explanation: "Trap: assuming a message was received is unsafe. Closed-loop communication confirms that critical information was delivered and understood."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trap",
    vignette: "A hospital wants to reduce catheter-associated UTIs. Staff suggest leaving catheters in place until discharge for convenience. What is the best intervention?",
    answers: ["Remove unnecessary catheters promptly", "Keep catheters for convenience", "Treat all patients with prophylactic antibiotics", "Stop documenting catheter days"],
    correct: 0,
    explanation: "Trap: convenience increases infection risk. Daily necessity review and prompt removal reduce catheter-associated UTIs."
  },

    // =========================================================
  // TRIGGER MODE
  // =========================================================

  // CARDIOLOGY — TRIGGER
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Exertional syncope + harsh systolic murmur radiating to carotids.",
    answers: ["Aortic stenosis", "Mitral regurgitation", "Hypertrophic cardiomyopathy", "Pulmonary embolism"],
    correct: 0,
    explanation: "Trigger: systolic murmur radiating to carotids with exertional syncope activates aortic stenosis."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Young athlete + exertional syncope + murmur louder with standing.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral stenosis", "Atrial septal defect"],
    correct: 1,
    explanation: "Trigger: murmur louder with standing/decreased preload activates hypertrophic cardiomyopathy."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Hypotension + JVD + muffled heart sounds after penetrating trauma.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Pulmonary embolism", "Aortic dissection"],
    correct: 0,
    explanation: "Trigger: Beck triad after trauma activates cardiac tamponade."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Irregularly irregular rhythm with no visible P waves.",
    answers: ["Atrial fibrillation", "Atrial flutter", "SVT", "Ventricular tachycardia"],
    correct: 0,
    explanation: "Trigger: irregularly irregular rhythm without P waves activates atrial fibrillation."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Tearing chest pain radiating to back + unequal arm blood pressures.",
    answers: ["Aortic dissection", "Acute MI", "Pericarditis", "GERD"],
    correct: 0,
    explanation: "Trigger: tearing back-radiating pain with pulse/BP differential activates aortic dissection."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Pleuritic chest pain better leaning forward + diffuse ST elevations.",
    answers: ["Pericarditis", "STEMI", "Pulmonary embolism", "Pneumonia"],
    correct: 0,
    explanation: "Trigger: positional pleuritic pain with diffuse ST elevations activates pericarditis."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "ST elevation in II, III, aVF.",
    answers: ["Inferior MI", "Anterior MI", "Lateral MI", "Posterior MI"],
    correct: 0,
    explanation: "Trigger: leads II, III, and aVF localize to inferior MI."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "ST elevation in V1-V4.",
    answers: ["Anterior MI", "Inferior MI", "Lateral MI", "Posterior MI"],
    correct: 0,
    explanation: "Trigger: V1-V4 localize to anterior/septal MI."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "Chest pain at rest + ST depressions.",
    answers: ["Acute coronary syndrome", "Stable angina", "GERD", "Costochondritis"],
    correct: 0,
    explanation: "Trigger: rest pain with ischemic ECG changes activates acute coronary syndrome."
  },
  {
    topic: "Cardiology",
    mode: "Trigger",
    vignette: "AFib + hypotension/confusion/pulmonary edema.",
    answers: ["Immediate synchronized cardioversion", "Oral beta-blocker", "Outpatient anticoagulation", "Observation"],
    correct: 0,
    explanation: "Trigger: unstable tachyarrhythmia activates synchronized cardioversion."
  },

  // PULMONOLOGY — TRIGGER
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Hypotension + unilateral absent breath sounds + tracheal deviation.",
    answers: ["Tension pneumothorax", "Simple pneumothorax", "Cardiac tamponade", "Flail chest"],
    correct: 0,
    explanation: "Trigger: shock with unilateral absent breath sounds and tracheal deviation activates tension pneumothorax."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Sudden pleuritic dyspnea + tachycardia + recent immobilization.",
    answers: ["Pulmonary embolism", "Pneumonia", "Asthma", "Pulmonary edema"],
    correct: 0,
    explanation: "Trigger: pleuritic dyspnea after immobilization activates pulmonary embolism."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Nighttime cough + episodic wheezing + improves with albuterol.",
    answers: ["Asthma", "COPD", "Pulmonary fibrosis", "Bronchiectasis"],
    correct: 0,
    explanation: "Trigger: episodic reversible wheeze with nocturnal symptoms activates asthma."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Chronic productive cough for 3 months per year for 2 consecutive years.",
    answers: ["Chronic bronchitis", "Emphysema", "Asthma", "Bronchiectasis"],
    correct: 0,
    explanation: "Trigger: 3 months/year for 2 years activates chronic bronchitis."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Cough + erythema nodosum + bilateral hilar lymphadenopathy.",
    answers: ["Sarcoidosis", "Tuberculosis", "Histoplasmosis", "Lung cancer"],
    correct: 0,
    explanation: "Trigger: erythema nodosum with bilateral hilar lymphadenopathy activates sarcoidosis."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Months of cough + night sweats + weight loss + upper-lobe cavitation.",
    answers: ["Tuberculosis", "Pneumonia", "Sarcoidosis", "Pulmonary edema"],
    correct: 0,
    explanation: "Trigger: chronic constitutional symptoms with upper-lobe cavitation activates tuberculosis."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Pink frothy sputum + orthopnea + diffuse crackles.",
    answers: ["Cardiogenic pulmonary edema", "COPD exacerbation", "Pneumonia", "Asthma"],
    correct: 0,
    explanation: "Trigger: pink frothy sputum with orthopnea activates cardiogenic pulmonary edema."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Sepsis + severe hypoxemia + bilateral infiltrates + no cardiac failure.",
    answers: ["ARDS", "Cardiogenic edema", "COPD", "Pulmonary embolism"],
    correct: 0,
    explanation: "Trigger: inflammatory trigger with noncardiogenic bilateral infiltrates activates ARDS."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Bird exposure + recurrent dyspnea after cleaning cages.",
    answers: ["Hypersensitivity pneumonitis", "Sarcoidosis", "Asthma", "Silicosis"],
    correct: 0,
    explanation: "Trigger: symptoms linked to organic antigen exposure activate hypersensitivity pneumonitis."
  },
  {
    topic: "Pulmonology",
    mode: "Trigger",
    vignette: "Smoker + weight loss + spiculated lung nodule.",
    answers: ["Lung cancer", "Benign granuloma", "Pneumonia", "Tuberculosis only"],
    correct: 0,
    explanation: "Trigger: smoking, weight loss, and spiculated nodule activate lung cancer."
  },

  // NEPHROLOGY — TRIGGER
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Hyperkalemia + peaked T waves + widened QRS.",
    answers: ["IV calcium gluconate", "Oral potassium binder", "Loop diuretic only", "Repeat labs tomorrow"],
    correct: 0,
    explanation: "Trigger: ECG changes in hyperkalemia activate immediate IV calcium."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Muddy brown granular casts after sepsis/hypotension.",
    answers: ["Acute tubular necrosis", "Prerenal azotemia", "IgA nephropathy", "Minimal change disease"],
    correct: 0,
    explanation: "Trigger: muddy brown casts activate acute tubular necrosis."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Gross hematuria within days of URI + normal complement.",
    answers: ["IgA nephropathy", "Poststreptococcal GN", "Minimal change disease", "Diabetic nephropathy"],
    correct: 0,
    explanation: "Trigger: synpharyngitic hematuria activates IgA nephropathy."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Cola urine + edema + hypertension weeks after strep throat.",
    answers: ["Poststreptococcal glomerulonephritis", "IgA nephropathy", "Nephrotic syndrome", "Cystitis"],
    correct: 0,
    explanation: "Trigger: nephritic syndrome weeks after strep activates PSGN."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Edema + heavy proteinuria + no RBC casts.",
    answers: ["Nephrotic syndrome", "Nephritic syndrome", "Pyelonephritis", "ATN"],
    correct: 0,
    explanation: "Trigger: edema with heavy proteinuria activates nephrotic syndrome."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Long diabetes duration + gradual CKD + heavy proteinuria.",
    answers: ["Diabetic nephropathy", "IgA nephropathy", "Postrenal AKI", "AIN"],
    correct: 0,
    explanation: "Trigger: long-standing diabetes with gradual proteinuric CKD activates diabetic nephropathy."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Bilateral enlarged cystic kidneys + family history of dialysis.",
    answers: ["ADPKD", "Simple renal cyst", "Renal cancer", "Pyelonephritis"],
    correct: 0,
    explanation: "Trigger: bilateral cystic kidneys with family history activates ADPKD."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Euvolemic hyponatremia + high urine osmolality + high urine sodium.",
    answers: ["SIADH", "Diabetes insipidus", "Primary polydipsia", "Hypovolemia"],
    correct: 0,
    explanation: "Trigger: concentrated urine despite euvolemic hyponatremia activates SIADH."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Fever + flank pain + CVA tenderness + urinary symptoms.",
    answers: ["Pyelonephritis", "Cystitis", "Nephrolithiasis", "Appendicitis"],
    correct: 0,
    explanation: "Trigger: systemic UTI with CVA tenderness activates pyelonephritis."
  },
  {
    topic: "Nephrology",
    mode: "Trigger",
    vignette: "Colicky flank-to-groin pain + hematuria.",
    answers: ["Ureteral stone", "Pyelonephritis", "Renal cell carcinoma", "Glomerulonephritis"],
    correct: 0,
    explanation: "Trigger: colicky flank-to-groin pain with hematuria activates ureteral stone."
  },
    // GASTROENTEROLOGY/HEPATOLOGY — TRIGGER
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Burning chest discomfort after meals + sour taste + worse lying down.",
    answers: ["GERD", "Peptic ulcer disease", "Pancreatitis", "Esophageal cancer"],
    correct: 0,
    explanation: "Trigger: postprandial burning with regurgitation and supine worsening activates GERD."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Cirrhosis + massive hematemesis.",
    answers: ["Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia", "Hemorrhoids"],
    correct: 0,
    explanation: "Trigger: cirrhosis with massive upper GI bleeding activates variceal hemorrhage."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "RUQ pain + fever + Murphy sign.",
    answers: ["Acute cholecystitis", "Biliary colic", "Pancreatitis", "Hepatitis"],
    correct: 0,
    explanation: "Trigger: RUQ pain with fever and Murphy sign activates acute cholecystitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Epigastric pain radiating to back + vomiting + alcohol use.",
    answers: ["Acute pancreatitis", "GERD", "Appendicitis", "IBS"],
    correct: 0,
    explanation: "Trigger: back-radiating epigastric pain after alcohol activates acute pancreatitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Chronic diarrhea + iron deficiency + improves off gluten.",
    answers: ["Celiac disease", "IBS", "Ulcerative colitis", "Lactose intolerance"],
    correct: 0,
    explanation: "Trigger: malabsorption and iron deficiency with gluten association activate celiac disease."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Watery diarrhea after clindamycin.",
    answers: ["C difficile infection", "Viral gastroenteritis", "IBS", "Salmonella"],
    correct: 0,
    explanation: "Trigger: antibiotic-associated watery diarrhea activates C difficile."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Chronic liver disease + ascites + jaundice + easy bruising.",
    answers: ["Decompensated cirrhosis", "Acute hepatitis only", "GERD", "IBS"],
    correct: 0,
    explanation: "Trigger: ascites/jaundice/coagulopathy signs in chronic liver disease activate decompensated cirrhosis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Fever + LLQ pain + sigmoid inflammation on CT.",
    answers: ["Diverticulitis", "Appendicitis", "IBS", "GERD"],
    correct: 0,
    explanation: "Trigger: LLQ pain with sigmoid inflammation activates diverticulitis."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Alternating bowel habits + pain relieved by defecation + no alarm features.",
    answers: ["Irritable bowel syndrome", "Crohn disease", "Colon cancer", "C difficile"],
    correct: 0,
    explanation: "Trigger: chronic bowel-related pain without alarm features activates IBS."
  },
  {
    topic: "Gastroenterology/Hepatology",
    mode: "Trigger",
    vignette: "Progressive dysphagia solids → liquids + weight loss.",
    answers: ["Esophageal cancer", "GERD", "Achalasia", "Esophageal spasm"],
    correct: 0,
    explanation: "Trigger: progressive dysphagia with weight loss activates esophageal cancer evaluation."
  },

  // ENDOCRINOLOGY — TRIGGER
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Hyperglycemia + vomiting + abdominal pain + Kussmaul respirations.",
    answers: ["Diabetic ketoacidosis", "HHS", "Hypoglycemia", "Thyroid storm"],
    correct: 0,
    explanation: "Trigger: hyperglycemia with acidosis symptoms and Kussmaul breathing activates DKA."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Glucose 950 + high serum osmolality + minimal ketones.",
    answers: ["HHS", "DKA", "Insulinoma", "Adrenal crisis"],
    correct: 0,
    explanation: "Trigger: extreme hyperglycemia with hyperosmolality and minimal ketosis activates HHS."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Weight loss + heat intolerance + tremor + goiter.",
    answers: ["Hyperthyroidism", "Hypothyroidism", "Cushing syndrome", "Addison disease"],
    correct: 0,
    explanation: "Trigger: adrenergic symptoms with weight loss and goiter activate hyperthyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Weight gain + cold intolerance + constipation + bradycardia.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Pheochromocytoma", "Adrenal crisis"],
    correct: 0,
    explanation: "Trigger: slowed metabolism pattern activates hypothyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Resistant hypertension + hypokalemia + metabolic alkalosis.",
    answers: ["Primary hyperaldosteronism", "SIADH", "Addison disease", "Hypothyroidism"],
    correct: 0,
    explanation: "Trigger: hypertension with hypokalemic metabolic alkalosis activates primary hyperaldosteronism."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Central obesity + purple striae + proximal weakness + easy bruising.",
    answers: ["Cushing syndrome", "PCOS", "Hypothyroidism", "Acromegaly"],
    correct: 0,
    explanation: "Trigger: catabolic skin/muscle findings with central obesity activate Cushing syndrome."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Irregular menses + acne + hirsutism + infertility.",
    answers: ["PCOS", "Menopause", "Hyperprolactinemia", "Endometriosis"],
    correct: 0,
    explanation: "Trigger: oligo-ovulation plus hyperandrogenism activates PCOS."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Kidney stones + bone pain + high calcium + high PTH.",
    answers: ["Primary hyperparathyroidism", "Vitamin D deficiency", "Hypocalcemia", "SIADH"],
    correct: 0,
    explanation: "Trigger: hypercalcemia with elevated PTH activates primary hyperparathyroidism."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Fasting sweating/tremor/confusion relieved by juice in nondiabetic.",
    answers: ["Insulinoma", "Panic disorder", "Hypothyroidism", "Adrenal insufficiency"],
    correct: 0,
    explanation: "Trigger: fasting hypoglycemic symptoms relieved by glucose activate insulinoma."
  },
  {
    topic: "Endocrinology",
    mode: "Trigger",
    vignette: "Low-trauma fracture in postmenopausal patient.",
    answers: ["Osteoporosis", "Normal aging", "Osteoarthritis", "Osteomyelitis"],
    correct: 0,
    explanation: "Trigger: fragility fracture activates osteoporosis."
  },

  // HEMATOLOGY/ONCOLOGY — TRIGGER
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Microcytic anemia + low ferritin + chronic blood loss.",
    answers: ["Iron deficiency anemia", "Thalassemia trait", "Anemia of chronic disease", "B12 deficiency"],
    correct: 0,
    explanation: "Trigger: low ferritin activates iron deficiency anemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Macrocytic anemia + paresthesias + gait instability.",
    answers: ["Vitamin B12 deficiency", "Folate deficiency", "Iron deficiency", "Thalassemia"],
    correct: 0,
    explanation: "Trigger: macrocytosis with neurologic deficits activates B12 deficiency."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Anemia + jaundice + dark urine + reticulocytosis.",
    answers: ["Hemolytic anemia", "Iron deficiency anemia", "Aplastic anemia", "Anemia of chronic disease"],
    correct: 0,
    explanation: "Trigger: anemia with jaundice/dark urine and reticulocytosis activates hemolysis."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Sickle cell disease + fever.",
    answers: ["Urgent evaluation for infection", "Routine outpatient reassurance", "No action if pain-free", "Iron supplementation only"],
    correct: 0,
    explanation: "Trigger: fever in sickle cell disease activates urgent infection/sepsis evaluation due to functional asplenia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Pancytopenia + infections + bruising.",
    answers: ["Aplastic anemia", "ITP", "Hemophilia", "Iron deficiency"],
    correct: 0,
    explanation: "Trigger: all three cell lines down activates marrow failure/aplastic anemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Fever + thrombocytopenia + confusion + renal injury + schistocytes.",
    answers: ["TTP", "ITP", "Hemophilia A", "Iron deficiency"],
    correct: 0,
    explanation: "Trigger: MAHA plus neurologic/renal findings activates TTP."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Fatigue + infections + gum bleeding + blasts on smear.",
    answers: ["Acute leukemia", "CML", "CLL", "Leukemoid reaction"],
    correct: 0,
    explanation: "Trigger: blasts with marrow failure symptoms activate acute leukemia."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Back pain + lytic lesions + renal dysfunction + high protein.",
    answers: ["Multiple myeloma", "Hodgkin lymphoma", "CLL", "Iron deficiency"],
    correct: 0,
    explanation: "Trigger: CRAB features with lytic lesions activate multiple myeloma."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Warfarin + high INR + no major bleeding.",
    answers: ["Hold warfarin and give vitamin K when indicated", "Protamine", "Platelet transfusion", "No reassessment"],
    correct: 0,
    explanation: "Trigger: supratherapeutic warfarin without major bleeding activates holding warfarin with vitamin K depending on INR/risk."
  },
  {
    topic: "Hematology/Oncology",
    mode: "Trigger",
    vignette: "Painless lymphadenopathy + B symptoms + pruritus in young adult.",
    answers: ["Hodgkin lymphoma", "Reactive lymphadenopathy", "Iron deficiency", "ITP"],
    correct: 0,
    explanation: "Trigger: painless lymphadenopathy with B symptoms and pruritus activates Hodgkin lymphoma."
  },

  // INFECTIOUS DISEASE — TRIGGER
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Infection + persistent hypotension + elevated lactate.",
    answers: ["Septic shock", "Simple fever", "Panic attack", "Vasovagal syncope"],
    correct: 0,
    explanation: "Trigger: infection with shock physiology and high lactate activates septic shock."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Fever + neck stiffness + confusion + petechial rash.",
    answers: ["Bacterial meningitis", "Migraine", "Viral URI", "Tension headache"],
    correct: 0,
    explanation: "Trigger: meningismus with altered mental status and petechiae activates bacterial meningitis."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Fever + personality change + focal seizures + temporal lobe findings.",
    answers: ["HSV encephalitis", "Bacterial sinusitis", "Migraine", "Bell palsy"],
    correct: 0,
    explanation: "Trigger: temporal lobe encephalitis activates HSV encephalitis."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Prosthetic valve + fever + new murmur.",
    answers: ["Infective endocarditis", "Pericarditis", "GERD", "COPD"],
    correct: 0,
    explanation: "Trigger: fever with new murmur in valve-risk patient activates infective endocarditis."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Unvaccinated child + cough/coryza/conjunctivitis + cephalocaudal rash.",
    answers: ["Measles", "Rubella", "Varicella", "Scarlet fever"],
    correct: 0,
    explanation: "Trigger: 3 Cs plus face-first spreading rash activates measles."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Painful genital ulcer + tender inguinal nodes.",
    answers: ["Chancroid", "Syphilis", "HSV", "Granuloma inguinale"],
    correct: 0,
    explanation: "Trigger: painful ulcer with tender nodes activates chancroid."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Advanced HIV + dry cough + hypoxemia + diffuse bilateral infiltrates.",
    answers: ["Pneumocystis pneumonia", "Lobar pneumonia", "TB only", "Asthma"],
    correct: 0,
    explanation: "Trigger: advanced HIV with dry cough and diffuse hypoxemia activates Pneumocystis pneumonia."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Jaundice + dark urine weeks after needlestick.",
    answers: ["Acute hepatitis B", "Chronic hepatitis B", "Resolved hepatitis B", "Vaccination immunity"],
    correct: 0,
    explanation: "Trigger: symptomatic hepatitis weeks after blood exposure activates acute hepatitis B."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "West Africa travel + recurrent fevers/chills + anemia + jaundice.",
    answers: ["Malaria", "Influenza", "IBS", "Strep throat"],
    correct: 0,
    explanation: "Trigger: cyclic fever with hemolysis after endemic travel activates malaria."
  },
  {
    topic: "Infectious Disease",
    mode: "Trigger",
    vignette: "Watery diarrhea after antibiotics.",
    answers: ["C difficile infection", "IBS", "Appendicitis", "GERD"],
    correct: 0,
    explanation: "Trigger: antibiotic-associated watery diarrhea activates C difficile infection."
  },

  // NEUROLOGY — TRIGGER
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Sudden focal deficit + normal glucose + onset 2 hours ago.",
    answers: ["Acute ischemic stroke", "Migraine only", "Bell palsy", "Panic attack"],
    correct: 0,
    explanation: "Trigger: acute persistent focal neurologic deficit activates stroke pathway."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Worst headache of life + maximal at onset + neck stiffness.",
    answers: ["Subarachnoid hemorrhage", "Migraine", "Tension headache", "Sinusitis"],
    correct: 0,
    explanation: "Trigger: thunderclap headache with meningismus activates subarachnoid hemorrhage."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Generalized seizure lasting more than 5 minutes.",
    answers: ["Status epilepticus", "Simple febrile seizure", "Syncope", "Absence seizure"],
    correct: 0,
    explanation: "Trigger: seizure beyond 5 minutes activates status epilepticus treatment."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Unilateral facial weakness including forehead.",
    answers: ["Bell palsy", "Cortical stroke", "Trigeminal neuralgia", "Migraine"],
    correct: 0,
    explanation: "Trigger: forehead involvement activates peripheral facial nerve palsy/Bell palsy."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Ascending weakness after diarrhea + areflexia.",
    answers: ["Guillain-Barré syndrome", "ALS", "Stroke", "Multiple sclerosis"],
    correct: 0,
    explanation: "Trigger: postinfectious ascending weakness with areflexia activates GBS."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Gradual memory decline + impaired finances/navigation.",
    answers: ["Alzheimer disease", "Normal aging", "Delirium", "Bell palsy"],
    correct: 0,
    explanation: "Trigger: progressive memory-predominant functional decline activates Alzheimer disease."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Fatigable ptosis and diplopia worse by evening.",
    answers: ["Myasthenia gravis", "Parkinson disease", "Stroke", "Migraine"],
    correct: 0,
    explanation: "Trigger: fatigable ocular weakness activates myasthenia gravis."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Rest tremor + bradykinesia + rigidity.",
    answers: ["Parkinson disease", "Essential tremor", "Cerebellar lesion", "Myasthenia gravis"],
    correct: 0,
    explanation: "Trigger: rest tremor with bradykinesia and rigidity activates Parkinson disease."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Neurologic episodes separated in time and space.",
    answers: ["Multiple sclerosis", "TIA only", "Panic disorder", "Bell palsy"],
    correct: 0,
    explanation: "Trigger: dissemination in time and space activates multiple sclerosis."
  },
  {
    topic: "Neurology",
    mode: "Trigger",
    vignette: "Vertigo lasting hours + tinnitus + ear fullness + fluctuating hearing loss.",
    answers: ["Ménière disease", "BPPV", "Vestibular neuritis", "Stroke"],
    correct: 0,
    explanation: "Trigger: episodic vertigo with unilateral auditory symptoms activates Ménière disease."
  },

  // PSYCHIATRY — TRIGGER
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Depressed mood/anhedonia + sleep/guilt/concentration symptoms >2 weeks.",
    answers: ["Major depressive disorder", "Adjustment disorder", "Normal sadness", "Bipolar disorder"],
    correct: 0,
    explanation: "Trigger: full depressive syndrome lasting more than 2 weeks activates MDD."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Decreased need for sleep + grandiosity + risky behavior + hospitalization.",
    answers: ["Mania", "Hypomania", "ADHD", "GAD"],
    correct: 0,
    explanation: "Trigger: decreased need for sleep with marked impairment/hospitalization activates mania."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Excessive worry across multiple domains for months.",
    answers: ["Generalized anxiety disorder", "Panic disorder", "Social anxiety disorder", "OCD"],
    correct: 0,
    explanation: "Trigger: chronic worry across many domains activates GAD."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Unexpected panic attacks + persistent fear of another attack.",
    answers: ["Panic disorder", "GAD", "PTSD", "OCD"],
    correct: 0,
    explanation: "Trigger: recurrent unexpected attacks plus anticipatory anxiety activates panic disorder."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Trauma + nightmares + avoidance + hypervigilance >1 month.",
    answers: ["PTSD", "Acute stress disorder", "Adjustment disorder", "MDD"],
    correct: 0,
    explanation: "Trigger: trauma symptoms beyond 1 month activate PTSD."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Intrusive contamination fear + repetitive washing + preserved insight.",
    answers: ["OCD", "Psychosis", "GAD", "Panic disorder"],
    correct: 0,
    explanation: "Trigger: obsessions relieved by compulsions activate OCD."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Hallucinations + delusions + disorganized speech + decline >6 months.",
    answers: ["Schizophrenia", "Brief psychotic disorder", "Schizophreniform disorder", "Delusional disorder"],
    correct: 0,
    explanation: "Trigger: psychosis with functional decline beyond 6 months activates schizophrenia."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Binge eating + vomiting/laxatives + normal BMI.",
    answers: ["Bulimia nervosa", "Anorexia nervosa", "Binge eating disorder", "ARFID"],
    correct: 0,
    explanation: "Trigger: bingeing with compensatory purging and non-low BMI activates bulimia nervosa."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Tremor + sweating + tachycardia within hours after last alcohol drink.",
    answers: ["Alcohol withdrawal", "Panic disorder", "Wernicke encephalopathy", "Hepatic encephalopathy"],
    correct: 0,
    explanation: "Trigger: autonomic hyperactivity after alcohol cessation activates alcohol withdrawal."
  },
  {
    topic: "Psychiatry",
    mode: "Trigger",
    vignette: "Grandiosity + need for admiration + lack of empathy.",
    answers: ["Narcissistic personality disorder", "Borderline personality disorder", "Avoidant personality disorder", "OCD"],
    correct: 0,
    explanation: "Trigger: grandiosity and admiration-seeking activate narcissistic personality disorder."
  },

  // RHEUMATOLOGY — TRIGGER
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Symmetric MCP/wrist swelling + morning stiffness >1 hour.",
    answers: ["Rheumatoid arthritis", "Osteoarthritis", "Gout", "Fibromyalgia"],
    correct: 0,
    explanation: "Trigger: symmetric inflammatory small-joint arthritis activates rheumatoid arthritis."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Photosensitive rash + oral ulcers + arthritis + serositis.",
    answers: ["SLE", "Rheumatoid arthritis", "Systemic sclerosis", "Sjögren syndrome"],
    correct: 0,
    explanation: "Trigger: multisystem autoimmune findings activate SLE."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Sudden first MTP arthritis after alcohol/steak.",
    answers: ["Gout", "Pseudogout", "RA", "OA"],
    correct: 0,
    explanation: "Trigger: podagra after alcohol/purines activates gout."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Older patient + acute swollen knee + chondrocalcinosis.",
    answers: ["Pseudogout", "Gout", "RA", "PMR"],
    correct: 0,
    explanation: "Trigger: acute knee arthritis with chondrocalcinosis activates pseudogout."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Older patient + shoulder/hip stiffness + normal true strength.",
    answers: ["Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis", "Fibromyalgia"],
    correct: 0,
    explanation: "Trigger: girdle stiffness without true weakness activates PMR."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Older patient + new headache + jaw claudication + visual symptoms.",
    answers: ["Giant cell arteritis", "Migraine", "Trigeminal neuralgia", "Cluster headache"],
    correct: 0,
    explanation: "Trigger: new headache with jaw claudication and visual symptoms in older patient activates GCA."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Raynaud + tight shiny fingers + reflux/dysphagia.",
    answers: ["Systemic sclerosis", "SLE", "Sjögren syndrome", "RA"],
    correct: 0,
    explanation: "Trigger: Raynaud plus sclerodactyly and esophageal dysmotility activates systemic sclerosis."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Young man + back pain worse with rest + improves with exercise.",
    answers: ["Ankylosing spondylitis", "Lumbar strain", "Osteoarthritis", "Gout"],
    correct: 0,
    explanation: "Trigger: inflammatory back pain pattern activates ankylosing spondylitis."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Dry eyes + dry mouth + dental caries + parotid swelling.",
    answers: ["Sjögren syndrome", "Diabetes mellitus", "Dehydration", "Allergic conjunctivitis"],
    correct: 0,
    explanation: "Trigger: sicca symptoms with dental/parotid involvement activate Sjögren syndrome."
  },
  {
    topic: "Rheumatology",
    mode: "Trigger",
    vignette: "Palpable purpura + pulmonary hemorrhage + rapidly worsening kidney function.",
    answers: ["Microscopic polyangiitis", "Osteoarthritis", "Fibromyalgia", "Gout"],
    correct: 0,
    explanation: "Trigger: pulmonary-renal syndrome with purpura activates small-vessel vasculitis such as microscopic polyangiitis."
  },
    // OB/GYN — TRIGGER
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Positive pregnancy test + unilateral pelvic pain + vaginal bleeding.",
    answers: ["Ectopic pregnancy", "Endometriosis", "Normal pregnancy", "PID"],
    correct: 0,
    explanation: "Trigger: early pregnancy with unilateral pain and bleeding activates ectopic pregnancy."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Early pregnancy bleeding + open cervical os.",
    answers: ["Inevitable abortion", "Threatened abortion", "Missed abortion", "Normal pregnancy"],
    correct: 0,
    explanation: "Trigger: bleeding with open cervical os activates inevitable abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Early pregnancy bleeding + closed cervical os.",
    answers: ["Threatened abortion", "Inevitable abortion", "Septic abortion", "Complete abortion"],
    correct: 0,
    explanation: "Trigger: bleeding with closed cervical os activates threatened abortion."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Third-trimester painless bright red bleeding + soft nontender uterus.",
    answers: ["Placenta previa", "Placental abruption", "Uterine rupture", "Preterm labor"],
    correct: 0,
    explanation: "Trigger: painless third-trimester bleeding activates placenta previa."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Third-trimester painful bleeding + uterine tenderness.",
    answers: ["Placental abruption", "Placenta previa", "Cervicitis", "Vasa previa"],
    correct: 0,
    explanation: "Trigger: painful bleeding with tender uterus activates placental abruption."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Severe-range BP in pregnancy + headache/visual symptoms/RUQ pain.",
    answers: ["Preeclampsia with severe features", "Gestational hypertension", "Normal pregnancy", "Chronic migraine"],
    correct: 0,
    explanation: "Trigger: severe BP plus neurologic/RUQ symptoms activates preeclampsia with severe features."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Pregnancy + seizure + hypertension.",
    answers: ["Eclampsia", "Epilepsy only", "Syncope", "Panic attack"],
    correct: 0,
    explanation: "Trigger: seizure in hypertensive pregnancy activates eclampsia."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Contractions before 37 weeks + cervical change.",
    answers: ["Preterm labor", "Braxton Hicks contractions", "Round ligament pain", "Placenta previa"],
    correct: 0,
    explanation: "Trigger: contractions with cervical change before 37 weeks activates preterm labor."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Recurrent late decelerations.",
    answers: ["Uteroplacental insufficiency", "Cord compression", "Normal fetal sleep", "Maternal fever"],
    correct: 0,
    explanation: "Trigger: late decelerations activate uteroplacental insufficiency."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Abrupt variable decelerations with variable timing and shape.",
    answers: ["Cord compression", "Uteroplacental insufficiency", "Fetal sleep", "Maternal fever"],
    correct: 0,
    explanation: "Trigger: variable decelerations activate cord compression."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Postpartum hemorrhage + boggy enlarged uterus.",
    answers: ["Uterine atony", "Cervical laceration", "Uterine inversion", "Retained placenta"],
    correct: 0,
    explanation: "Trigger: postpartum bleeding with boggy uterus activates uterine atony."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Postpartum fever + uterine tenderness + foul lochia.",
    answers: ["Endometritis", "Mastitis", "UTI", "Wound dehiscence"],
    correct: 0,
    explanation: "Trigger: postpartum uterine tenderness with foul lochia activates endometritis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Breastfeeding + fever + painful wedge-shaped breast erythema.",
    answers: ["Mastitis", "Fibroadenoma", "Breast cancer", "Galactocele only"],
    correct: 0,
    explanation: "Trigger: lactational fever with focal painful erythema activates mastitis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Pelvic pain + fever + cervical motion tenderness + mucopurulent discharge.",
    answers: ["Pelvic inflammatory disease", "Endometriosis", "Ovarian torsion", "Ectopic pregnancy"],
    correct: 0,
    explanation: "Trigger: cervical motion tenderness with fever/discharge activates PID."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Sudden severe unilateral pelvic pain + nausea/vomiting.",
    answers: ["Ovarian torsion", "PID", "Endometriosis", "Mittelschmerz"],
    correct: 0,
    explanation: "Trigger: sudden unilateral pelvic pain with vomiting activates ovarian torsion."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Cyclic pelvic pain + deep dyspareunia + infertility.",
    answers: ["Endometriosis", "Adenomyosis", "PID", "Ovarian torsion"],
    correct: 0,
    explanation: "Trigger: cyclic pelvic pain with dyspareunia/infertility activates endometriosis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Heavy painful menses + uniformly enlarged tender uterus.",
    answers: ["Adenomyosis", "Leiomyomas", "Endometrial cancer", "PCOS"],
    correct: 0,
    explanation: "Trigger: diffusely enlarged tender uterus with heavy painful menses activates adenomyosis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Heavy bleeding + pelvic pressure + irregular enlarged uterus.",
    answers: ["Leiomyomas", "Adenomyosis", "Endometriosis", "Cervicitis"],
    correct: 0,
    explanation: "Trigger: irregular enlarged uterus with bulk symptoms activates leiomyomas."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Postmenopausal bleeding.",
    answers: ["Evaluate for endometrial cancer", "Reassure as normal", "Treat as ovulation", "Ignore if painless"],
    correct: 0,
    explanation: "Trigger: postmenopausal bleeding activates endometrial evaluation."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Thin gray fishy discharge + vaginal pH >4.5.",
    answers: ["Bacterial vaginosis", "Candidiasis", "Physiologic discharge", "Atrophic vaginitis"],
    correct: 0,
    explanation: "Trigger: fishy thin discharge with elevated pH activates bacterial vaginosis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Intense vulvar itching + thick white discharge + normal pH.",
    answers: ["Vulvovaginal candidiasis", "Bacterial vaginosis", "Trichomoniasis", "Cervicitis"],
    correct: 0,
    explanation: "Trigger: pruritus with thick discharge and normal pH activates candidiasis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Frothy yellow-green discharge + strawberry cervix.",
    answers: ["Trichomoniasis", "Bacterial vaginosis", "Candidiasis", "Atrophic vaginitis"],
    correct: 0,
    explanation: "Trigger: frothy discharge with strawberry cervix activates trichomoniasis."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Irregular menses + acne + hirsutism + infertility.",
    answers: ["PCOS", "Endometriosis", "Menopause", "Asherman syndrome"],
    correct: 0,
    explanation: "Trigger: oligo-ovulation plus hyperandrogenism activates PCOS."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Amenorrhea + galactorrhea + negative pregnancy test.",
    answers: ["Hyperprolactinemia", "PCOS", "Asherman syndrome", "Menopause"],
    correct: 0,
    explanation: "Trigger: amenorrhea with galactorrhea activates hyperprolactinemia."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Amenorrhea after dilation and curettage.",
    answers: ["Asherman syndrome", "PCOS", "Pregnancy", "Endometriosis"],
    correct: 0,
    explanation: "Trigger: amenorrhea after uterine instrumentation activates Asherman syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Hot flashes + vaginal dryness + 12 months amenorrhea.",
    answers: ["Menopause", "PCOS", "Pregnancy", "Endometrial cancer"],
    correct: 0,
    explanation: "Trigger: 12 months amenorrhea with vasomotor/vaginal symptoms activates menopause."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Primary amenorrhea + normal breasts + cyclic pelvic pain + bulging bluish hymen.",
    answers: ["Imperforate hymen", "Turner syndrome", "Müllerian agenesis", "PCOS"],
    correct: 0,
    explanation: "Trigger: normal puberty with cyclic pain and obstructed outflow activates imperforate hymen."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Primary amenorrhea + short stature + webbed neck + no breast development.",
    answers: ["Turner syndrome", "Imperforate hymen", "PCOS", "Pregnancy"],
    correct: 0,
    explanation: "Trigger: Turner stigmata with absent puberty activates Turner syndrome."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Wants highly effective reversible contraception without daily adherence.",
    answers: ["Long-acting reversible contraception", "Calendar method", "Withdrawal", "Spermicide alone"],
    correct: 0,
    explanation: "Trigger: high efficacy plus no daily adherence activates LARC."
  },
  {
    topic: "OB/GYN",
    mode: "Trigger",
    vignette: "Migraine with aura + smoking + wants contraception.",
    answers: ["Progestin-only or non-estrogen method", "Combined estrogen pill", "Estrogen patch", "Combined vaginal ring"],
    correct: 0,
    explanation: "Trigger: migraine with aura activates avoidance of estrogen-containing contraception."
  },

  // PEDIATRICS — TRIGGER
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "6-week-old + projectile nonbilious vomiting + hungry after feeds.",
    answers: ["Pyloric stenosis", "GERD", "Intussusception", "Malrotation"],
    correct: 0,
    explanation: "Trigger: projectile nonbilious vomiting in a hungry young infant activates pyloric stenosis."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Intermittent severe crying + knees to chest + currant-jelly stool.",
    answers: ["Intussusception", "Pyloric stenosis", "Hirschsprung disease", "Viral gastroenteritis"],
    correct: 0,
    explanation: "Trigger: episodic colicky pain with currant-jelly stool activates intussusception."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Newborn + bilious vomiting + abdominal distension.",
    answers: ["Malrotation with volvulus", "GERD", "Pyloric stenosis", "Milk protein allergy"],
    correct: 0,
    explanation: "Trigger: bilious vomiting in a newborn activates malrotation/volvulus emergency."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Delayed meconium + abdominal distension + explosive stool after rectal exam.",
    answers: ["Hirschsprung disease", "Pyloric stenosis", "Intussusception", "Simple constipation"],
    correct: 0,
    explanation: "Trigger: delayed meconium with explosive stool after rectal exam activates Hirschsprung disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Barking cough + hoarseness + inspiratory stridor after viral prodrome.",
    answers: ["Croup", "Epiglottitis", "Bronchiolitis", "Foreign body aspiration"],
    correct: 0,
    explanation: "Trigger: barky cough and hoarseness activate croup."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Infant in winter + URI → wheezing/tachypnea/poor feeding.",
    answers: ["Bronchiolitis", "Asthma", "Croup", "Epiglottitis"],
    correct: 0,
    explanation: "Trigger: first-time infant wheeze after URI activates bronchiolitis."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "High fever + drooling + muffled voice + tripod posture.",
    answers: ["Epiglottitis", "Croup", "Viral pharyngitis", "Bronchiolitis"],
    correct: 0,
    explanation: "Trigger: drooling, muffled voice, and tripod posture activate epiglottitis."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Sudden cough/wheeze while playing with small toys + unilateral decreased breath sounds.",
    answers: ["Foreign body aspiration", "Asthma", "Croup", "Bronchiolitis"],
    correct: 0,
    explanation: "Trigger: abrupt respiratory symptoms during play with unilateral findings activate foreign body aspiration."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Fever ≥5 days + conjunctivitis + cracked lips + swollen hands + rash.",
    answers: ["Kawasaki disease", "Scarlet fever", "Measles", "JIA"],
    correct: 0,
    explanation: "Trigger: prolonged fever with mucocutaneous/extremity findings activates Kawasaki disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Migratory arthritis + carditis + chorea after untreated sore throat.",
    answers: ["Acute rheumatic fever", "Kawasaki disease", "Septic arthritis", "JIA"],
    correct: 0,
    explanation: "Trigger: Jones-criteria pattern after strep activates acute rheumatic fever."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Fever + refuses to bear weight + painful hip.",
    answers: ["Septic arthritis", "Transient synovitis", "SCFE", "Osgood-Schlatter"],
    correct: 0,
    explanation: "Trigger: fever with refusal to bear weight activates septic arthritis."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "School-aged child + painless limp + limited hip abduction.",
    answers: ["Legg-Calvé-Perthes disease", "Septic arthritis", "SCFE", "Transient synovitis"],
    correct: 0,
    explanation: "Trigger: painless limp with limited hip motion in school-aged child activates Legg-Calvé-Perthes."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Overweight adolescent + knee pain + limited hip internal rotation.",
    answers: ["Slipped capital femoral epiphysis", "Legg-Calvé-Perthes", "Osgood-Schlatter", "Septic arthritis"],
    correct: 0,
    explanation: "Trigger: overweight adolescent with referred knee pain and limited hip rotation activates SCFE."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Adolescent athlete + anterior knee pain + tibial tubercle tenderness.",
    answers: ["Osgood-Schlatter disease", "SCFE", "Septic arthritis", "Patellar dislocation"],
    correct: 0,
    explanation: "Trigger: tibial tubercle pain in adolescent athlete activates Osgood-Schlatter disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Bruises in different stages + fracture inconsistent with history.",
    answers: ["Nonaccidental trauma", "Normal toddler injury", "Vitamin D deficiency", "Osteogenesis imperfecta only"],
    correct: 0,
    explanation: "Trigger: injury-history mismatch with bruises in different stages activates nonaccidental trauma."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Brief generalized seizure + fever + rapid return to baseline.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Infantile spasms"],
    correct: 0,
    explanation: "Trigger: brief generalized fever-associated seizure activates simple febrile seizure."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Infant + clusters of flexion spasms after waking + regression.",
    answers: ["Infantile spasms", "Absence seizures", "Breath-holding spells", "Simple febrile seizure"],
    correct: 0,
    explanation: "Trigger: clustered infant spasms with regression activate infantile spasms."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Frequent brief staring spells + eyelid fluttering + immediate return.",
    answers: ["Absence seizures", "Focal impaired awareness seizure", "ADHD", "Syncope"],
    correct: 0,
    explanation: "Trigger: brief staring with immediate recovery activates absence seizures."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Polyuria + polydipsia + weight loss + vomiting + Kussmaul respirations.",
    answers: ["Diabetic ketoacidosis", "Viral gastroenteritis", "Diabetes insipidus", "Type 2 diabetes only"],
    correct: 0,
    explanation: "Trigger: hyperglycemic symptoms with Kussmaul breathing activate DKA."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Cola urine + edema + hypertension after throat infection.",
    answers: ["Poststreptococcal glomerulonephritis", "Minimal change disease", "Cystitis", "Nephrolithiasis"],
    correct: 0,
    explanation: "Trigger: post-strep nephritic syndrome activates PSGN."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Child + edema + heavy proteinuria + no RBC casts.",
    answers: ["Minimal change disease", "PSGN", "IgA nephropathy", "Cystitis"],
    correct: 0,
    explanation: "Trigger: childhood nephrotic syndrome activates minimal change disease."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Palpable purpura + abdominal pain + arthralgia + hematuria + normal platelets.",
    answers: ["IgA vasculitis", "ITP", "Meningococcemia", "Kawasaki disease"],
    correct: 0,
    explanation: "Trigger: purpura with GI/joint/renal involvement and normal platelets activates IgA vasculitis."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Infant + jaundice + vomiting + hepatomegaly + cataracts after milk.",
    answers: ["Galactosemia", "Physiologic jaundice", "Breast milk jaundice", "Biliary atresia"],
    correct: 0,
    explanation: "Trigger: systemic illness and cataracts after milk exposure activate galactosemia."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Persistent jaundice + pale stools + dark urine + hepatomegaly.",
    answers: ["Biliary atresia", "Breast milk jaundice", "Physiologic jaundice", "Gilbert syndrome"],
    correct: 0,
    explanation: "Trigger: cholestatic jaundice with pale stools activates biliary atresia."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Poor eye contact + repetitive behaviors + social communication deficit.",
    answers: ["Autism spectrum disorder", "ADHD", "Normal development", "ODD"],
    correct: 0,
    explanation: "Trigger: social communication impairment plus restricted/repetitive behaviors activates autism spectrum disorder."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Inattention/hyperactivity in multiple settings for >6 months.",
    answers: ["ADHD", "Autism", "Normal behavior", "Specific learning disorder"],
    correct: 0,
    explanation: "Trigger: persistent symptoms across settings activates ADHD."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Newborn cyanosis worse with feeding, improves with crying.",
    answers: ["Choanal atresia", "Tetralogy of Fallot", "TTN", "Laryngomalacia"],
    correct: 0,
    explanation: "Trigger: cyanosis worsened by feeding and relieved by crying activates choanal atresia."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Cyanotic spells relieved by squatting/knee-chest position.",
    answers: ["Tetralogy of Fallot", "VSD", "ASD", "PDA"],
    correct: 0,
    explanation: "Trigger: tet spells relieved by squatting activate tetralogy of Fallot."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Premature infant + early respiratory distress + diffuse atelectasis.",
    answers: ["Neonatal respiratory distress syndrome", "TTN", "Meconium aspiration", "Pneumonia"],
    correct: 0,
    explanation: "Trigger: prematurity with atelectasis activates neonatal RDS."
  },
  {
    topic: "Pediatrics",
    mode: "Trigger",
    vignette: "Term cesarean infant + mild tachypnea improving over 24 hours.",
    answers: ["Transient tachypnea of newborn", "Neonatal RDS", "Meconium aspiration", "Congenital pneumonia"],
    correct: 0,
    explanation: "Trigger: term C-section with self-limited tachypnea activates TTN."
  },
    // SURGERY / EMERGENCY — TRIGGER
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Periumbilical pain migrates to RLQ + anorexia + McBurney tenderness.",
    answers: ["Appendicitis", "Gastroenteritis", "Diverticulitis", "Renal colic"],
    correct: 0,
    explanation: "Trigger: migratory periumbilical-to-RLQ pain with anorexia activates appendicitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "RUQ pain + fever + positive Murphy sign.",
    answers: ["Acute cholecystitis", "Biliary colic", "GERD", "IBS"],
    correct: 0,
    explanation: "Trigger: RUQ pain with fever and Murphy sign activates acute cholecystitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Epigastric pain radiating to back + vomiting + alcohol use.",
    answers: ["Acute pancreatitis", "GERD", "Small bowel obstruction", "Appendicitis"],
    correct: 0,
    explanation: "Trigger: back-radiating epigastric pain after alcohol activates acute pancreatitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Sudden severe abdominal pain + rigid abdomen + free air under diaphragm.",
    answers: ["Perforated viscus", "Small bowel obstruction", "Diverticulitis", "IBS"],
    correct: 0,
    explanation: "Trigger: peritonitis with free intraperitoneal air activates perforated viscus."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Prior abdominal surgery + crampy pain + vomiting + distension + obstipation.",
    answers: ["Small bowel obstruction", "Gastroenteritis", "Pancreatitis", "Cystitis"],
    correct: 0,
    explanation: "Trigger: prior surgery with obstructive symptoms activates adhesive small bowel obstruction."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Atrial fibrillation + sudden abdominal pain out of proportion.",
    answers: ["Mesenteric ischemia", "Appendicitis", "Constipation", "GERD"],
    correct: 0,
    explanation: "Trigger: embolic risk plus pain out of proportion activates mesenteric ischemia."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Older smoker + abdominal/back pain + hypotension + pulsatile abdominal mass.",
    answers: ["Ruptured abdominal aortic aneurysm", "Renal colic", "Musculoskeletal pain", "Pancreatitis"],
    correct: 0,
    explanation: "Trigger: shock with pulsatile abdominal mass activates ruptured AAA."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Sudden painful cold pale pulseless leg.",
    answers: ["Acute limb ischemia", "Deep vein thrombosis", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "Trigger: acute 6 Ps of limb ischemia activate arterial occlusion."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Sudden testicular pain + high-riding testis + absent cremasteric reflex.",
    answers: ["Testicular torsion", "Epididymitis", "Hydrocele", "Varicocele"],
    correct: 0,
    explanation: "Trigger: sudden pain with high-riding testis and absent cremasteric reflex activates testicular torsion."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Colicky flank-to-groin pain + hematuria + pacing.",
    answers: ["Ureteral stone", "Pyelonephritis", "Appendicitis", "Testicular torsion"],
    correct: 0,
    explanation: "Trigger: colicky flank-to-groin pain with hematuria activates ureteral stone."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Fracture + escalating pain + tense compartments + pain with passive stretch.",
    answers: ["Compartment syndrome", "DVT", "Cellulitis", "Peripheral neuropathy"],
    correct: 0,
    explanation: "Trigger: pain out of proportion with passive stretch after fracture activates compartment syndrome."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Rapidly spreading soft tissue infection + pain out of proportion + crepitus.",
    answers: ["Necrotizing fasciitis", "Cellulitis", "Erysipelas", "DVT"],
    correct: 0,
    explanation: "Trigger: rapid progression with pain out of proportion and crepitus activates necrotizing fasciitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Facial burns + soot in mouth + hoarseness.",
    answers: ["Early endotracheal intubation", "Outpatient follow-up", "Topical antibiotics only", "Oral antihistamine"],
    correct: 0,
    explanation: "Trigger: inhalation injury signs activate early airway protection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Penetrating chest trauma + hypotension + JVD + muffled heart sounds + equal breath sounds.",
    answers: ["Cardiac tamponade", "Tension pneumothorax", "Hemothorax", "Flail chest"],
    correct: 0,
    explanation: "Trigger: Beck triad with equal breath sounds activates cardiac tamponade."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Trauma + shock + unilateral absent breath sounds + tracheal deviation.",
    answers: ["Tension pneumothorax", "Cardiac tamponade", "Flail chest", "Pulmonary embolism"],
    correct: 0,
    explanation: "Trigger: obstructive shock with unilateral absent breath sounds activates tension pneumothorax."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Blunt chest trauma + paradoxical chest wall movement.",
    answers: ["Flail chest", "Rib contusion", "Tension pneumothorax", "Cardiac tamponade"],
    correct: 0,
    explanation: "Trigger: paradoxical segment movement activates flail chest."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Post-op day 2 + low-grade fever + shallow breathing + mild hypoxemia.",
    answers: ["Atelectasis", "Wound infection", "Anastomotic leak", "Deep abscess"],
    correct: 0,
    explanation: "Trigger: early postoperative fever with splinting/shallow breathing activates atelectasis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Post-op day 5 + fever + erythematous warm incision + purulent drainage.",
    answers: ["Surgical site infection", "Atelectasis", "Urinary retention", "Normal healing"],
    correct: 0,
    explanation: "Trigger: purulent wound drainage with fever activates surgical site infection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Older adult + sudden painless bright red blood per rectum.",
    answers: ["Diverticular bleeding", "Anal fissure", "Ischemic colitis", "GERD"],
    correct: 0,
    explanation: "Trigger: painless lower GI bleeding in older adult activates diverticular bleeding."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Severe pain with defecation + small bright red blood on toilet paper.",
    answers: ["Anal fissure", "Hemorrhoids", "Diverticular bleeding", "Colon cancer"],
    correct: 0,
    explanation: "Trigger: painful defecation with small-volume bright blood activates anal fissure."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Painless bright red blood coating stool + perianal swelling.",
    answers: ["Hemorrhoids", "Anal fissure", "Ischemic colitis", "IBD"],
    correct: 0,
    explanation: "Trigger: painless bright bleeding with perianal swelling activates hemorrhoids."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Vomiting/distension after surgery + absent bowel sounds + diffuse gas without transition point.",
    answers: ["Ileus", "Mechanical bowel obstruction", "Mesenteric ischemia", "Appendicitis"],
    correct: 0,
    explanation: "Trigger: postoperative absent bowel sounds with diffuse gas activates ileus."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Fever + RUQ pain + jaundice + hypotension + confusion.",
    answers: ["Ascending cholangitis", "Acute cholecystitis", "Viral hepatitis", "Pancreatitis"],
    correct: 0,
    explanation: "Trigger: Charcot triad plus shock/AMS activates severe ascending cholangitis."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Painless jaundice + weight loss + palpable nontender gallbladder.",
    answers: ["Pancreatic cancer", "Acute hepatitis", "Cholecystitis", "GERD"],
    correct: 0,
    explanation: "Trigger: painless obstructive jaundice with Courvoisier sign activates pancreatic cancer."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Tearing chest pain to back + unequal arm blood pressures.",
    answers: ["Aortic dissection", "Acute MI", "Pericarditis", "Pneumonia"],
    correct: 0,
    explanation: "Trigger: tearing back-radiating pain with BP asymmetry activates aortic dissection."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Blunt abdominal trauma + hypotension + free fluid on FAST + left shoulder pain.",
    answers: ["Splenic rupture", "Appendicitis", "Renal colic", "Pancreatitis"],
    correct: 0,
    explanation: "Trigger: trauma with intraperitoneal fluid and Kehr sign activates splenic rupture."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Pelvic fracture + blood at urethral meatus + inability to void.",
    answers: ["Urethral injury", "Bladder infection", "Renal stone", "Testicular torsion"],
    correct: 0,
    explanation: "Trigger: pelvic fracture with blood at meatus activates urethral injury."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Inability to urinate + suprapubic pain + distended tender bladder.",
    answers: ["Acute urinary retention", "Pyelonephritis", "Renal infarction", "Ureteral stone"],
    correct: 0,
    explanation: "Trigger: painful distended bladder with inability to void activates acute urinary retention."
  },
  {
    topic: "Surgery/Emergency",
    mode: "Trigger",
    vignette: "Dental infection + fever + drooling + muffled voice + trismus.",
    answers: ["Deep neck space infection", "Viral pharyngitis", "GERD", "Allergic rhinitis"],
    correct: 0,
    explanation: "Trigger: drooling, muffled voice, trismus, and dental source activate deep neck space infection."
  },

  // QUALITY / PATIENT SAFETY — TRIGGER
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Wrong patient error from similar names and room-number identification.",
    answers: ["Use two patient identifiers", "Use room number", "Use bed number", "Ask family only"],
    correct: 0,
    explanation: "Trigger: wrong-patient risk activates two patient identifiers."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Critical pending task omitted during sign-out.",
    answers: ["Standardized handoff tool", "Longer shifts", "Informal reminder", "No written sign-out"],
    correct: 0,
    explanation: "Trigger: handoff omission activates standardized handoff."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Consent and schedule disagree on surgical laterality.",
    answers: ["Preoperative time-out", "Proceed from memory", "Postoperative debrief only", "Ignore discrepancy"],
    correct: 0,
    explanation: "Trigger: wrong-site surgery risk activates preoperative time-out."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Central-line infections + variable sterile insertion practices.",
    answers: ["Central-line insertion checklist", "Longer antibiotics", "Daily blood cultures", "Room cleaning only"],
    correct: 0,
    explanation: "Trigger: inconsistent line insertion practice activates checklist/bundle."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Ventilator patients + inconsistent head-of-bed elevation/sedation interruption.",
    answers: ["Ventilator care bundle", "Routine broad antibiotics", "Daily CT chest", "Delay extubation"],
    correct: 0,
    explanation: "Trigger: inconsistent VAP-prevention steps activate ventilator care bundle."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Nurse flags 10× medication dose but prescriber insists.",
    answers: ["Escalate using chain of command", "Administer anyway", "Wait until next shift", "Ask family"],
    correct: 0,
    explanation: "Trigger: unresolved high-risk medication concern activates chain-of-command escalation."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Nighttime fall after sedating medication.",
    answers: ["Fall risk assessment and prevention plan", "Physical restraints for all", "Bed rest for all", "Ignore if first fall"],
    correct: 0,
    explanation: "Trigger: sedative-associated fall risk activates targeted fall prevention."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Patient misunderstands insulin instructions despite discharge paperwork.",
    answers: ["Teach-back", "Longer paperwork only", "Only ask yes/no understanding", "Avoid insulin forever"],
    correct: 0,
    explanation: "Trigger: misunderstanding despite instructions activates teach-back."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Outpatient clinician never receives discharge summary.",
    answers: ["Improve care transitions", "Increase length of stay", "Avoid follow-up", "Change antibiotic"],
    correct: 0,
    explanation: "Trigger: failed communication across settings activates care-transition improvement."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Home medication unintentionally omitted on admission.",
    answers: ["Medication reconciliation", "Daily weights only", "Insurance review", "Diet counseling"],
    correct: 0,
    explanation: "Trigger: admission medication omission activates medication reconciliation."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Small rapid test of workflow change before expansion.",
    answers: ["Plan-Do-Study-Act cycle", "Root cause analysis", "Case-control study", "Meta-analysis"],
    correct: 0,
    explanation: "Trigger: small test of change activates PDSA cycle."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Serious adverse event review to identify system contributors.",
    answers: ["Root cause analysis", "PDSA cycle", "Patient satisfaction survey", "Cost-effectiveness analysis"],
    correct: 0,
    explanation: "Trigger: serious event system review activates root cause analysis."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Patient harmed by medical error but later recovers.",
    answers: ["Disclose the error", "Hide because recovery occurred", "Wait for patient to ask", "Tell no one"],
    correct: 0,
    explanation: "Trigger: harmful error activates disclosure, even if harm resolves."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Wrong dose caught before reaching patient.",
    answers: ["Report as near miss", "Ignore because no harm", "Delete silently", "Punish reporter"],
    correct: 0,
    explanation: "Trigger: intercepted error activates near-miss reporting."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Unnecessary urinary catheters remain in patients.",
    answers: ["Remove unnecessary catheters", "Routine antibiotics", "Daily urine cultures", "Use larger catheters"],
    correct: 0,
    explanation: "Trigger: avoidable catheter days activate catheter removal to prevent CAUTI."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Immobile patient + inconsistent repositioning + pressure injury.",
    answers: ["Scheduled turning and pressure offloading", "Routine antibiotics", "Strict bed rest", "Daily blood cultures"],
    correct: 0,
    explanation: "Trigger: pressure injury risk activates turning/offloading."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Opioid given + oversedation + slow respirations.",
    answers: ["Sedation and respiratory monitoring", "Pain score only", "No reassessment", "Immediate discharge"],
    correct: 0,
    explanation: "Trigger: opioid respiratory depression risk activates sedation/respiratory reassessment."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Tracks whether antibiotics were given before incision.",
    answers: ["Process measure", "Outcome measure", "Balancing measure", "Sentinel event"],
    correct: 0,
    explanation: "Trigger: measuring whether a care step occurred activates process measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Tracks postoperative infection rate.",
    answers: ["Outcome measure", "Process measure", "Balancing measure", "Root cause"],
    correct: 0,
    explanation: "Trigger: measuring the result of care activates outcome measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Intervention reduces readmissions but increases urgent clinic calls.",
    answers: ["Balancing measure", "Process measure", "Outcome measure only", "Never measure"],
    correct: 0,
    explanation: "Trigger: unintended consequence tracking activates balancing measure."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Staff avoid reporting near misses because of blame culture.",
    answers: ["Just culture", "More punishment", "Fewer reports", "Secrecy"],
    correct: 0,
    explanation: "Trigger: need for reporting plus fair accountability activates just culture."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Allergy documented but buried in scanned record and no alert fires.",
    answers: ["Improve allergy documentation and alerts", "Remove allergy list", "Ignore scanned records", "Use wristband only"],
    correct: 0,
    explanation: "Trigger: inaccessible safety-critical allergy information activates better allergy documentation/alerts."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Limited English proficiency + high-risk informed consent.",
    answers: ["Use professional medical interpreter", "Use family member only", "Use gestures", "Skip consent"],
    correct: 0,
    explanation: "Trigger: LEP with consent activates professional medical interpreter."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Confused hospitalized patient pulling lines and trying to climb out of bed.",
    answers: ["Evaluate reversible causes and use least restrictive safety measures", "Permanent restraints first", "Ignore behavior", "Sedate without assessment"],
    correct: 0,
    explanation: "Trigger: unsafe delirium-like behavior activates reversible-cause evaluation and least restrictive measures."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "CKD patient receives standard nephrotoxic dose without renal dosing guidance.",
    answers: ["Clinical decision support for renal dosing", "Handwritten orders only", "Avoid all meds", "No labs"],
    correct: 0,
    explanation: "Trigger: kidney-function prescribing risk activates renal dosing decision support."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Worsening vitals documented but not escalated in sepsis.",
    answers: ["Early warning system", "Longer notes", "Fewer vitals", "Delayed triage"],
    correct: 0,
    explanation: "Trigger: failure to recognize deterioration activates early warning system."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Variable ICU-to-ward phone sign-out with omitted information.",
    answers: ["Structured transfer checklist", "Unstructured call only", "Shorter note", "Delay all transfers"],
    correct: 0,
    explanation: "Trigger: variable transfer communication activates structured checklist."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Duplicate anticoagulation from outpatient and inpatient active orders.",
    answers: ["Medication reconciliation", "More INR checks only", "Avoid anticoagulation forever", "Ask patient to choose"],
    correct: 0,
    explanation: "Trigger: duplicate therapy from active med lists activates medication reconciliation."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Monthly performance reports sent back to units.",
    answers: ["Audit and feedback", "Root cause analysis", "Case report", "Blame meeting"],
    correct: 0,
    explanation: "Trigger: measured performance returned to clinicians activates audit and feedback."
  },
  {
    topic: "Quality/Patient Safety",
    mode: "Trigger",
    vignette: "Wrong dose selected after repeated interruptions during order entry.",
    answers: ["Reduce interruptions during order entry", "Punish resident", "Add random pop-ups", "Eliminate medication orders"],
    correct: 0,
    explanation: "Trigger: interruption-related ordering error activates human-factors redesign."
  }
  ];


const REPORT_EMAIL = "aliakramqureshi@kemu.edu.pk";
const SESSION_LENGTH = 10;
const TIMER_SECONDS = 10;

const MODE_META = {
  Basic: {
    label: "Basic",
    description: "Classic presentation recognition",
    badge: "BSC",
  },
  Decipher: {
    label: "Decipher",
    description: "Extract signal from NBME-style noise",
    badge: "DEC",
  },
  Differential: {
    label: "Differential",
    description: "Separate look-alike diagnoses",
    badge: "DIF",
  },
  Trap: {
    label: "Trap",
    description: "Avoid the tempting wrong move",
    badge: "TRP",
  },
  Trigger: {
    label: "Trigger",
    description: "Instant decisive clue recognition",
    badge: "TRG",
  },
};

const shuffleArray = (array) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const questionBank = rawQuestionBank.map((q, index) => {
  const modeBadge = MODE_META[q.mode]?.badge || "Q";
  const paddedNumber = String(index + 1).padStart(4, "0");

  return {
    ...q,
    qid: `${modeBadge}-${paddedNumber}`,
  };
});

export default function ReflexTrainer() {
  const [gameStarted, setGameStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Basic");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(false);

  const generateNewSession = (modeOverride = selectedMode) => {
    const modeQuestions = questionBank.filter((q) => q.mode === modeOverride);
    const newQuestions = shuffleArray(modeQuestions).slice(0, SESSION_LENGTH);

    setSessionQuestions(newQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShuffledAnswers([]);
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(true);
    setSessionComplete(false);
  };

  const startGame = () => {
    setGameStarted(true);
    generateNewSession(selectedMode);
  };

  const current = sessionQuestions[currentQIndex];

  useEffect(() => {
    if (!gameStarted || !current || sessionComplete) return;

    setShuffledAnswers(shuffleArray(current.answers));
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(true);
  }, [currentQIndex, current, gameStarted, sessionComplete]);

  useEffect(() => {
    if (!gameStarted || !timerActive || answered || sessionComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          setAnswered(true);
          setSelectedAnswer(null);
          setStreak(0);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, timerActive, answered, sessionComplete]);

  const handleAnswer = (index) => {
    if (!current || answered) return;

    const isCorrect = shuffledAnswers[index] === current.answers[current.correct];

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

  const resetToStart = () => {
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
    setTimeLeft(TIMER_SECONDS);
  };

  const answeredCount = currentQIndex + (answered ? 1 : 0);
  const accuracy = Math.round((score / answeredCount) * 100) || 0;

  const correctAnswerText = current ? current.answers[current.correct] : "";
  const selectedAnswerText =
    selectedAnswer === null ? "No answer / timed out" : shuffledAnswers[selectedAnswer];

  const reportIssueHref = current
    ? `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(
        `Reflex Trainer issue: ${current.qid}`
      )}&body=${encodeURIComponent(
        [
          `QID: ${current.qid}`,
          `Mode: ${current.mode}`,
          `Topic: ${current.topic}`,
          "",
          `Stem: ${current.vignette}`,
          "",
          `Selected answer: ${selectedAnswerText}`,
          `Correct answer: ${correctAnswerText}`,
          "",
          "Issue:",
        ].join("\n")
      )}`
    : "#";

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              STEP 2 CK Reflex Trainer
            </h1>

            <p className="text-indigo-200 text-base md:text-xl mb-6 leading-relaxed">
              Build faster clinical pattern recognition with short, timed Step 2 CK-style reflex questions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6">
              {Object.values(MODE_META).map((mode) => {
                const isSelected = selectedMode === mode.label;

                return (
                  <button
                    key={mode.label}
                    onClick={() => setSelectedMode(mode.label)}
                    className={`rounded-xl border p-3 text-left transition ${
                      isSelected
                        ? "bg-white text-indigo-900 border-white shadow-lg"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <div className="font-bold text-sm md:text-base">
                      {mode.label}
                    </div>
                    <div
                      className={`text-xs mt-1 leading-snug ${
                        isSelected ? "text-indigo-700" : "text-indigo-200"
                      }`}
                    >
                      {mode.description}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-7 rounded-full text-base md:text-lg transition shadow-lg"
            >
              Start {selectedMode} Training
            </button>

            <p className="text-indigo-300 text-sm mt-5">
              Choose a mode • {SESSION_LENGTH}-question sessions • {TIMER_SECONDS} seconds per question
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

            <p className="text-indigo-200 text-base md:text-lg mb-2">
              Mode: <span className="font-bold text-white">{selectedMode}</span>
            </p>

            <p className="text-indigo-200 text-base md:text-lg mb-6">
              Nice work. Here is how you did this round.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 rounded-xl p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-green-400">
                  {score}/{sessionQuestions.length}
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
                onClick={() => generateNewSession(selectedMode)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-7 rounded-full transition"
              >
                Start New {selectedMode} Session
              </button>

              <button
                onClick={resetToStart}
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
            {selectedMode} Mode • {SESSION_LENGTH}-Question Session • {TIMER_SECONDS} seconds/question
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
          <div className="mb-3 flex justify-between items-start gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs md:text-sm font-semibold">
                {current.topic}
              </span>

              <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs md:text-sm font-semibold">
                {current.mode}
              </span>

              <span className="inline-block bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs md:text-sm font-semibold">
                {current.qid}
              </span>

              <span className="text-slate-500 text-xs md:text-sm">
                Q{currentQIndex + 1}/{sessionQuestions.length}
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
              style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
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
                  key={answer}
                  onClick={() => handleAnswer(idx)}
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

              <a
                href={reportIssueHref}
                className="inline-block mt-3 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 underline"
              >
                Report issue with this question
              </a>
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
            onClick={() => generateNewSession(selectedMode)}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-lg transition flex items-center gap-2 text-sm md:text-base"
          >
            🔄 New Session
          </button>
          <button
  onClick={resetToStart}
  className="bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-lg transition border border-white/20 text-sm md:text-base"
>
  ← Mode Select
</button>
        </div>
      </div>
    </div>
  );
}
