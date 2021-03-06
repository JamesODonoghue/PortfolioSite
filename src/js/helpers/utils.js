import _ from 'lodash';

export default {

    mapCSVData(data){

        var fields = _.slice(data, 0, 1);
        fields[0].splice(4, 1, 'Steps');

        var healthBody = _.slice(data, 1);
        var dataObj = [{}];


        if(!data){
            console.error('No data provided');
        } else {

            _.forEach(healthBody, function(row, i){
                var obj = {};
                _.forEach(row, function(col, j){
                    obj[fields[0][j]] = col;
                });

                if(!(obj.Steps === '0.0' && obj['Active Calories (kcal)'] === '0.0' && obj['Cycling Distance (mi)'] === '0.0')){
                    dataObj.push(obj);

                }

                
            });

        }

        return dataObj;
        
    }
}
