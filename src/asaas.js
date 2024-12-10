
export class Client {
    constructor(name, cpfCnpj, email, mobilePhone, address, addressNumber, complement, province, postalCode,
                externalReference, notificationDisabled) {
        this.name = name;
        this.cpfCnpj = cpfCnpj;
        this.email = email;
        this.mobilePhone = mobilePhone;
        this.address = address;
        this.addressNumber = addressNumber;
        this.complement = complement;
        this.province = province;
        this.postalCode = postalCode;
        this.externalReference = externalReference;
        this.notificationDisabled = notificationDisabled;
    }
}


