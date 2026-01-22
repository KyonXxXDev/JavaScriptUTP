import ConvertAPI from 'convertapi-js';

const convertapi = new ConvertAPI(process.env.AUTH);

export async function convertDocxToPdf(docxPath, outputDir) {
    const result = await convertapi.convert(
        'pdf',
        { File: docxPath },
        'docx'
    );
    console.log(result)
    await result.saveFiles(outputDir);
}