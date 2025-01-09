document.addEventListener('DOMContentLoaded', insertfast);

function insertfast() {
  var urlstring = window.location.search.substring(1);

  if (urlstring.length > 0) {

    var marcstring = urlstring.split("=")[1];

    if (marcstring.indexOf('OCoLC') > 0) {

        // Clean up encoding from the FAST API
        let marcString = decodeURIComponent(marcstring);
        marcString = marcString.replace(/\(\$[a-zA-Z]\)(.*?)/g, '$1$2');
        marcString = marcString.replace(/\+/g, ' ');
        marcString = marcString.replace(/[:]/g, '');

        const tag = marcString.substring(0, 3);
        const firstIndicator = marcString.substring(5, 6);
        const secondIndicator = marcString.substring(6, 7);

        const fastPos = marcString.indexOf('$2fast');
        let fastID = marcString.substring(marcString.indexOf('$0') + 2);
        fastID = fastID.replace('(OCoLC)', '');

        document.querySelector('#subject_authority_id_').value = fastID;

        const subjectSourceSelect = document.querySelector('#subject_source_');
        subjectSourceSelect.value = 'fast';

        let subjectTerms = marcString.substring(8, fastPos);
        subjectTerms = decodeURI(subjectTerms);

        const subfields = subjectTerms.split('$');

        for (let i = 1; i < subfields.length; i++) {
            const clonedSubjectTerm = document.querySelector('#subject_terms__0_').cloneNode(true);
            clonedSubjectTerm.id = `subject_terms__${i}_`;

            const termsInput = clonedSubjectTerm.querySelector("input[name='subject[terms][0][term]']");
            termsInput.name = `subject[terms][${i}][term]`;
            const typeSelect = clonedSubjectTerm.querySelector("select[name='subject[terms][0][term_type]']");
            typeSelect.name = `subject[terms][${i}][term_type]`;
            
            document.querySelector('#subject_terms__0_').parentNode.appendChild(clonedSubjectTerm);
        }

        setSubjectType(tag, '#subject_terms__0__term_type_');
        
        subfields.forEach((subfield, i) => {
            const termInput = document.querySelector(`#subject_terms__${i}__term_`);
            termInput.value = subfield.substring(1);

            setSubjectType(subfield[0], `#subject_terms__${i}__term_type_`);
        });
      }
  }
}

function setSubjectType(code, selector) {
  const subjectTypeSelect = document.querySelector(selector);
  console.log(subjectTypeSelect)
  switch (code) {
    case '650':
    case '150':
      subjectTypeSelect.value = 'topical';
      break;
    case '651':
    case '151':
      subjectTypeSelect.value = 'geographic';
      break;
    case '655':
    case '155':
      subjectTypeSelect.value = 'genre_form';
      break;
    case '630':
    case '130':
      subjectTypeSelect.value = 'uniform_title';
      break;
    case 'x':
      subjectTypeSelect.value = 'topical';
      break;
    case 'z':
    case 'c':
      subjectTypeSelect.value = 'geographic';
      break;
    case 'y':
    case 'd':
      subjectTypeSelect.value = 'temporal';
      break;
    case 'v':
      subjectTypeSelect.value = 'genre_form';
      break;
    default:
      subjectTypeSelect.value = 'topical';
  }
}