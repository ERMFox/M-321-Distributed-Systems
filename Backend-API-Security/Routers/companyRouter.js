const express = require('express');
const { getAllCompanies, getOneCompany, createCompany, updateCompany, deleteCompany } = require('../handlers/companyHandler');
const { authenticate, adminProtected } = require('../middleware/auth');

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve companies' });
  }
});

router.get('/:companyId', async(req, res) => {
  try {
    const company = await getOneCompany(req.params.companyId);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve company' });
  }
});

router.post('/', authenticate, adminProtected, async(req, res) => {
  try {
    const newCompany = await createCompany(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create company' });
  }
});

router.put('/:companyId', authenticate, adminProtected, async(req, res) => {
  try {
    const updatedCompany = await updateCompany(req.params.companyId, req.body);
    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company' });
  }
});

router.delete('/:companyId', authenticate, adminProtected, async(req, res) => {
  try {
    await deleteCompany(req.params.companyId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

module.exports = router;
