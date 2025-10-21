/**
 * Test script for PDF generation and template functionality
 */

// Test PDF generation
async function testPDFGeneration() {
  console.log('Testing PDF generation...');
  
  try {
    const { PDFGenerator } = await import('./server/pdf-generator.js');
    
    const testData = {
      offerId: 'TEST-2024-001',
      offerDate: new Date().toLocaleDateString('en-US'),
      clientNameEn: 'Test Client',
      clientNameAr: 'عميل تجريبي',
      clientEmail: 'test@example.com',
      clientPhone: '+966501234567',
      ltaNameEn: 'Test LTA',
      ltaNameAr: 'اتفاقية تجريبية',
      items: [
        {
          sku: 'TEST-001',
          nameEn: 'Test Product',
          nameAr: 'منتج تجريبي',
          contractPrice: '100.00',
          currency: 'SAR'
        }
      ],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
      notes: 'This is a test PDF generation',
      language: 'en'
    };

    const pdfBuffer = await PDFGenerator.generatePriceOffer(testData);
    console.log('✅ PDF generation successful');
    console.log('PDF size:', pdfBuffer.length, 'bytes');
    
    return true;
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    return false;
  }
}

// Test Object Storage
async function testObjectStorage() {
  console.log('Testing Object Storage...');
  
  try {
    const { PDFStorage } = await import('./server/object-storage.js');
    
    // Create a test buffer
    const testBuffer = Buffer.from('Test PDF content');
    const fileName = `test-${Date.now()}.pdf`;
    
    // Test upload
    const uploadResult = await PDFStorage.uploadPDF(testBuffer, fileName);
    if (!uploadResult.ok) {
      throw new Error(`Upload failed: ${uploadResult.error}`);
    }
    console.log('✅ PDF upload successful');
    
    // Test download
    const downloadResult = await PDFStorage.downloadPDF(uploadResult.fileName);
    if (!downloadResult.ok) {
      throw new Error(`Download failed: ${downloadResult.error}`);
    }
    console.log('✅ PDF download successful');
    
    return true;
  } catch (error) {
    console.error('❌ Object Storage test failed:', error);
    return false;
  }
}

// Test template schema validation
async function testTemplateValidation() {
  console.log('Testing template validation...');
  
  try {
    const { saveTemplateSchema } = await import('./shared/schema.js');
    
    // Test valid template
    const validTemplate = {
      nameEn: 'Test Template',
      nameAr: 'قالب تجريبي',
      items: [
        { productId: 'prod-1', quantity: 2 },
        { productId: 'prod-2', quantity: 1 }
      ]
    };
    
    const result = saveTemplateSchema.parse(validTemplate);
    console.log('✅ Valid template validation passed');
    
    // Test invalid template
    try {
      const invalidTemplate = {
        nameEn: '', // Empty name should fail
        nameAr: 'قالب تجريبي',
        items: []
      };
      
      saveTemplateSchema.parse(invalidTemplate);
      console.log('❌ Invalid template validation should have failed');
      return false;
    } catch (error) {
      console.log('✅ Invalid template validation correctly failed');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Template validation test failed:', error);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting PDF and Template tests...\n');
  
  const results = await Promise.all([
    testPDFGeneration(),
    testObjectStorage(),
    testTemplateValidation()
  ]);
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above for details.');
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { testPDFGeneration, testObjectStorage, testTemplateValidation };