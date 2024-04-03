const { User, Profiles } = require('../Schema/RegesterSchema');

async function generateEmployeeCode() {
  
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Generate the pattern-based part of the code
  const patternPart = 'SI';

  // Find the latest employee with a matching year and pattern
  const latestEmployee = await Profiles.findOne({
    EmployeeCode: { $regex: `^${currentYear}${patternPart}` },
  }).sort({ EmployeeCode: -1 });

  let codeNumber = 1;
  if (latestEmployee) {
    // Extract the code number from the latest employee code
    const latestCodeNumber = parseInt(latestEmployee.EmployeeCode.slice(-3));
    codeNumber = latestCodeNumber + 1;
  }

  // Format the code number with leading zeros
  const formattedCodeNumber = codeNumber.toString().padStart(3, '0');
  // Combine the current year, pattern, and code number
  const EmployeeCode = `${currentYear}${patternPart}${formattedCodeNumber}`;

  return EmployeeCode;
}

module.exports = generateEmployeeCode;
