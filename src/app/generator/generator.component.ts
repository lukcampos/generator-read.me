import { Inject, Component, OnInit } from '@angular/core';
import { UploadResult, Readme, Prerequisite } from '../models/readme.model';
import { ReadFileService } from '../services/index';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  content: string = ''
  mode: string = 'editor'
  readme: Readme = new Readme();
  readmeForm: FormGroup;
  step: number = 1;
  prerequisites: Array<Prerequisite> = [
    {
      title: "nodeJs",
      enabled: false,
      id: '1'
    },
    {
      title: "MacOS",
      enabled: false,
      id: '2'
    },
    {
      title: "windows",
      enabled: false,
      id: '3'
    },
    {
      title: "Linux",
      enabled: false,
      id: '4'
    },
    {
      title: "Redis",
      enabled: false,
      id: '5'
    },
    {
      title: "MongoDB",
      enabled: false,
      id: '5'
    },
    {
      title: "Angular CLI",
      enabled: false,
      id: '6'
    }
  ]
  constructor(
    private readFileService: ReadFileService,
    private fb: FormBuilder,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document
  ) {
    this.doUpload = this.doUpload.bind(this);  // This is very important.

    this.readmeForm = this.fb.group(
      {
        projectTitle: [, Validators.compose([Validators.required])],
        projectDescription: [],
        prerequisitesTitle: [],
        prerequisites: new FormArray([]),
        instalationTitle: ['instalation (development)'],
        instlalationSteps: new FormArray([]),
        author: [],
      },
    );

    const checkboxes = <FormArray>this.readmeForm.get('prerequisites');
    this.prerequisites.forEach((option: any) => {
      let check: Prerequisite = {
        title: option.title,
        enabled: option.enabled,
        id: option.id
      }
      checkboxes.push(new FormControl(check))
    });

  }

  async ngOnInit() {


    await this.updateMD()


  }

  async next(step: number, section: string) {

    await this.updateMD()
    this.scroll(section)
    setTimeout(() => {
      this.step = step + 1;
    }, 200)
  }

  async updateMD() {

    const formValues = this.readmeForm.value;
    try {
      var content = await this.readFileService.read('neotix.template.md')
      // console.log('content', content)
      this.content = content;


      this.readme.projectTitle = formValues.projectTitle || "";
      this.readme.projectDescription = formValues.projectDescription || ""
      this.readme.author = formValues.author || ""

      var replaceStrings: Array<any> = [
        { key: 'projectTitle', type: '#' },
        { key: 'projectDescription', type: "##" },
        { key: 'prerequisites', type: "-" },
        { key: 'instalationSteps', type: "-" },
        { key: 'author', type: '###' },

      ]


      replaceStrings.forEach(repalceString => {


        if (repalceString.key == 'prerequisites') {
          var fomatedPrerequistes = "";
          console.log('formValues.prerequisites.lenght', formValues.prerequisites.length, formValues.prerequisites)
          if (formValues.prerequisites.length > 0) {

            var count = 0
            formValues.prerequisites.forEach((element, index) => {
              if (element.enabled) {
                count = count + 1;
                fomatedPrerequistes = fomatedPrerequistes + `- ${element.title} \n`
              }
            });
            this.content = this.content.replace(`{{${repalceString.key}}}`, fomatedPrerequistes);
            console.log("count", count)
            if (count == 0) {
              this.content = this.content.replace(`{{prerequisitesTitle}}`, "");
            } else {
              var prerequisitesTitle = "## Prerequisites:"
              this.content = this.content.replace(`{{prerequisitesTitle}}`, prerequisitesTitle);
            }

          } else {
            this.content = this.content.replace(`{{${repalceString.key}}}`, "");
            this.content = this.content.replace(`{{prerequisitesTitle}}`, "");
          }

        } else if (repalceString.key == 'instalationSteps') {
          var fomatedINstalationSteps = "";
          console.log('formValues.prerequisites.lenght', formValues.instlalationSteps.length, formValues.prerequisites)
          if (formValues.instlalationSteps.length > 0) {

            formValues.instlalationSteps.forEach((element, index) => {

              fomatedINstalationSteps = fomatedINstalationSteps + '- `' + element + '` \n';

            });
            this.content = this.content.replace(`{{${repalceString.key}}}`, fomatedINstalationSteps);

            var instalationTitle = `## ${formValues.instalationTitle}:`;
            this.content = this.content.replace(`{{instalationTitle}}`, instalationTitle);


          } else {
            this.content = this.content.replace(`{{${repalceString.key}}}`, "");
            this.content = this.content.replace(`{{instalationTitle}}`, "");
          }

        } else if (repalceString.key == 'author') {
          console.log('repalceString', repalceString, this.readme[`${repalceString.key}`])
          if (this.readme[`${repalceString.key}`] != "") {
            this.content = this.content.replace(`{{${repalceString.key}}}`, repalceString.type + " " + this.readme[`${repalceString.key}`] + "\n");
            this.content = this.content.replace(`{{${repalceString.key}Title}}`, "##Author");
          } else {
            this.content = this.content.replace(`{{${repalceString.key}}}`, "");
            this.content = this.content.replace(`{{${repalceString.key}Title}}`, "");
          }

        } else {
          console.log('repalceString', repalceString, this.readme[`${repalceString.key}`])
          if (this.readme[`${repalceString.key}`] != "") {
            this.content = this.content.replace(`{{${repalceString.key}}}`, repalceString.type + " " + this.readme[`${repalceString.key}`] + "\n");
          } else {
            this.content = this.content.replace(`{{${repalceString.key}}}`, "");
          }

        }
      });

    } catch (err) {
      console.log('err', err)
    }
  }


  templateGenerator() {



  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // do upload file by yourself
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
  }


  onEditorLoaded(event) {
    // console.log(event)
  }

  onPreviewDomChanged(event) {
    // console.log(event)
  }

  postRenderFunc(event) {
    // console.log('postRenderFunc', event)
    return event;
  }

  preRenderFunc(event) {
    // console.log('preRenderFunc', event)
    return event;
  }


  scroll(section: string) {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: `#${section}`,
    });
  }


  get prerequisitesForm(): FormArray {
    return this.readmeForm.get('prerequisites') as FormArray;
  }

  get instlalationStepsForm(): FormArray {
    return this.readmeForm.get('instlalationSteps') as FormArray;
  }




  updatePrerequisite(index, event) {
    // updatePrerequisiteco
    console.log('UPDATE', index, event)
    let prerequisitesToUpdate = this.readmeForm.get('prerequisites') as FormArray;

    console.log('prerequisitesToUpdate.controls[index]', prerequisitesToUpdate.controls[index])

    var newPrerequisite = prerequisitesToUpdate.controls[index].value;
    newPrerequisite.enabled = event.checked;
    prerequisitesToUpdate.controls[index].setValue(newPrerequisite);
  }

  addPrerequisite(customPR) {

    // updatePrerequisiteco
    // console.log('UPDATE',index,event)
    let prerequisitesToUpdate = this.readmeForm.get('prerequisites') as FormArray;


    let check: Prerequisite = {
      title: customPR.value,
      enabled: false,
      id: '_' + Math.random().toString(36).substr(2, 9)
    }
    prerequisitesToUpdate.push(new FormControl(check));

    customPR.value = "";
  }

  trackBID(_index, item) {
    return item.id;
  }

  addInstalatonStep(instalationStep) {

    let instalationStepsArray = this.readmeForm.get('instlalationSteps') as FormArray;

    instalationStepsArray.push(new FormControl(instalationStep.value));

    instalationStep.value = "";
  }

  deleteInstalationStep(index: number) {
    let instalationStepsArray = this.readmeForm.get('instlalationSteps') as FormArray;

    instalationStepsArray.removeAt(index)

  }

}
