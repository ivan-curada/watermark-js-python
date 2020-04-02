
def createPdf():
    import PyPDF2

    clientPdfDocument = open('sample.pdf', 'rb')
    systemStampPdf = open('stamp.pdf', 'rb')

    clientPdf = PyPDF2.PdfFileReader(clientPdfDocument)
    stampPdf = PyPDF2.PdfFileReader(systemStampPdf)
    output = PyPDF2.PdfFileWriter()

    for i in range(clientPdf.getNumPages()):
        page = clientPdf.getPage(i)
        page.mergePage(stampPdf.getPage(0))
        output.addPage(page)

    output_file = open('output.pdf','wb')
    output.write(output_file)

    clientPdfDocument.close()
    systemStampPdf.close()
    output_file.close()
    print("Process complete")
    print("Cleaning resources...")
    cleanResources()


def cleanResources():
    import os
    try:
        tempfiles = ['template.html','stamp.pdf']
        for files in tempfiles:
            os.remove(files)
        print('Resources cleaned')
    except Exception as e:
        print(e)

if __name__ == "__main__":
    createPdf()